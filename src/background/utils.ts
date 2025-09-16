import {
  createGist,
  getGist,
  editGist,
  GistData,
  REMU_SYNC_FILENAME,
} from './syncService';
// Chrome Storage API wrappers for Service Worker
const localStoragePromise = {
  get: (keys: string | string[] | Record<string, any>) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, resolve);
    });
  },
  set: (items: Record<string, any>) => {
    return new Promise((resolve) => {
      chrome.storage.local.set(items, resolve);
    });
  },
};

const syncStoragePromise = {
  get: (keys: string | string[] | Record<string, any>) => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(keys, resolve);
    });
  },
  set: (items: Record<string, any>) => {
    return new Promise((resolve) => {
      chrome.storage.sync.set(items, resolve);
    });
  },
};

const genUniqueKey = () => {
  return (
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2)
  );
};

const debounce = (fn: Function, timeout = 1000) => {
  let timer: any;
  return function(...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
};
import { GistDataRsp } from './syncService';
import {
  STORAGE_TOKEN,
  STORAGE_GIST_ID,
  STORAGE_GIST_UPDATE_TIME,
  STORAGE_TAGS,
  STORAGE_REPO,
  IS_UPDATE_LOCAL,
  STORAGE_SETTINGS,
  STORAGE_NOTES,
} from '../typings';
import { DEFAULT_SYNCHRONIZING_DELAY } from '../constants';

export const initGist = () => {
  syncStoragePromise.get([STORAGE_TOKEN, STORAGE_GIST_ID]).then((result) => {
    const token = (result as any)[STORAGE_TOKEN];
    const gistId = (result as any)[STORAGE_GIST_ID];
    if (token && !gistId) {
      createGist('init gist', token).then(({ data }: GistDataRsp) => {
        const gistId = data.id;
        const updateTime = data.updated_at;
        return syncStoragePromise.set({
          [STORAGE_GIST_UPDATE_TIME]: updateTime,
          [STORAGE_GIST_ID]: gistId,
        });
      });
    }
  });
};

export interface ISyncInfo {
  token: string;
  gistId: string;
  updateAt?: string;
}

export const initEnv = async () => {
  return syncStoragePromise
    .get({
      [STORAGE_TOKEN]: '',
      [STORAGE_GIST_ID]: '',
      [STORAGE_GIST_UPDATE_TIME]: '',
      [STORAGE_SETTINGS]: { synchronizingDelay: DEFAULT_SYNCHRONIZING_DELAY },
    })
    .then<ISyncInfo>((results) => {
      const { token, gistId, updateAt, settings } = results as any;
      return { token, gistId, updateAt, settings };
    });
};

export const checkSync = async (info) => {
  const { token, gistId, updateAt } = info;
  if (token && gistId) {
    return getGist({ gistId, token }).then(({ data }) => {
      const gistUpdateAt = data.updated_at;
      if (updateAt < gistUpdateAt) {
        updateLocal(data);
        // tslint:disable-next-line:no-console
        console.log('remu: update local');
      } else if (updateAt > gistUpdateAt) {
        updateGist(info);
        // tslint:disable-next-line:no-console
        console.log('remu: update gist');
      } else {
        // tslint:disable-next-line:no-console
        console.log('remu: up to date');
      }
    });
  } else {
    return Promise.reject();
  }
};

const setBrowseAction = ({ title = '', text = '' }) => {
  chrome.action.setTitle({ title });
  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
};

export const updateGist = ({ token, gistId, updateAt }: ISyncInfo) => {
  setBrowseAction({ title: 'update Gist', text: '...' });
  return localStoragePromise
    .get([STORAGE_TAGS, STORAGE_REPO, STORAGE_NOTES])
    .then((results) => {
      const { tags, repoWithTags, repoWithNotes } = results as any;

      if (tags && repoWithTags) {
        const data = { tags, repoWithTags, repoWithNotes };
        const content = JSON.stringify(data);
        return editGist(content, gistId, token).then(
          ({ data }: GistDataRsp) => {
            syncStoragePromise
              .set({
                [STORAGE_GIST_UPDATE_TIME]: data.updated_at,
              })
              .catch((errors) => {
                chrome.action.setBadgeBackgroundColor({
                  color: [255, 0, 0, 255],
                });
              })
              .finally(() => {
                setBrowseAction({});
              });
          },
        );
      }

      return null;
    });
};

export const updateGistDebounce = debounce(updateGist);

export const updateLocal = (data: GistData) => {
  setBrowseAction({ title: 'update Local', text: '...' });
  const content = data.files[REMU_SYNC_FILENAME].content;
  let _data;
  try {
    _data = JSON.parse(content);
  } catch (e) {
    return Promise.reject();
  }
  const { tags, repoWithTags, repoWithNotes } = _data;
  const setNewTagsAndRepoWithTags = localStoragePromise.set({
    [STORAGE_REPO]: repoWithTags,
    [STORAGE_NOTES]: repoWithNotes,
    [STORAGE_TAGS]: tags,
    [IS_UPDATE_LOCAL]: genUniqueKey(),
  });

  const setUpdateAt = syncStoragePromise.set({
    [STORAGE_GIST_UPDATE_TIME]: data.updated_at,
  });

  return Promise.all([setNewTagsAndRepoWithTags, setUpdateAt])
    .catch((errors) => {
      chrome.action.setBadgeBackgroundColor({
        color: [255, 0, 0, 255],
      });
    })
    .finally(() => {
      setBrowseAction({});
    });
};
