import { createGist, getGist } from './syncService';
import {
  STORAGE_TOKEN,
  STORAGE_GIST_ID,
  STORAGE_GIST_UPDATE_TIME,
  STORAGE_TAGS,
  STORAGE_REPO,
  IS_UPDATE_LOCAL,
  STORAGE_SETTINGS,
  IMessageAction,
  IResponseMsg,
} from '../typings';
import {
  ISyncInfo,
  checkSync,
  updateGist,
  updateLocal,
  initEnv,
} from './utils';

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

// Service Worker global variables
let REMU_GIST_ID = '';
let REMU_TOKEN = '';
let REMU_GIST_UPDATE_AT = '';
let REMU_SYNC_DELAY = 0;
let timeoutId: any = null;

chrome.action.onClicked.addListener(function() {
  const index = chrome.runtime.getURL('view-tab.html');
  chrome.tabs.query({ url: index }, function(tabs) {
    if (tabs.length) {
      chrome.tabs.update(tabs[0].id, { active: true });
      chrome.windows.update(tabs[0].windowId, { focused: true });
    } else {
      chrome.tabs.create({ url: index });
    }
  });
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'sync') {
    // only add token
    if (changes[STORAGE_TOKEN] && !REMU_GIST_ID) {
      const token = changes[STORAGE_TOKEN].newValue;
      createGist('create gist', token).then(({ data }) => {
        const gistId = data.id;
        const updateTime = data.updated_at;
        return syncStoragePromise
          .set({
            [STORAGE_GIST_ID]: gistId,
            [STORAGE_GIST_UPDATE_TIME]: updateTime,
          })
          .then(() => {
            REMU_GIST_ID = gistId;
            REMU_TOKEN = token;
            REMU_GIST_UPDATE_AT = updateTime;
          });
      });
    }
  }

  if (areaName === 'local') {
    if (changes[STORAGE_REPO] && !changes[IS_UPDATE_LOCAL]) {
      if (REMU_GIST_ID) {
        const info: ISyncInfo = {
          token: REMU_TOKEN,
          gistId: REMU_GIST_ID,
        };
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          updateGist(info);
        }, REMU_SYNC_DELAY);
      }
    }
  }
});

initEnv().then((info) => {
  REMU_GIST_ID = info.gistId;
  REMU_TOKEN = info.token;
  REMU_GIST_UPDATE_AT = info.updateAt || '';
  REMU_SYNC_DELAY =
    ((info as any).settings && (info as any).settings.synchronizingDelay) || 0;
  return checkSync(info);
});

chrome.runtime.onMessage.addListener(function(
  request: IMessageAction,
  sender,
  sendResponse,
) {
  const { type, payload } = request;
  let message: IResponseMsg;
  if (type === 'refresh') {
    initEnv().then((info) => {
      REMU_GIST_ID = info.gistId;
      REMU_TOKEN = info.token;
      REMU_GIST_UPDATE_AT = info.updateAt || '';
      REMU_SYNC_DELAY =
        ((info as any).settings && (info as any).settings.synchronizingDelay) ||
        0;
      message = { status: 'success' };
      sendResponse(message);
    });
  } else if (REMU_GIST_ID) {
    if (type === 'updateGist') {
      initEnv()
        .then((info) => {
          REMU_GIST_ID = info.gistId;
          REMU_TOKEN = info.token;
          REMU_GIST_UPDATE_AT = info.updateAt || '';
          return updateGist(info);
        })
        .then(() => {
          message = { status: 'success' };
          sendResponse(message);
        })
        .catch(() => {
          message = { status: 'error' };
          sendResponse(message);
        });
    } else if (type === 'updateLocal') {
      initEnv()
        .then((info) => {
          REMU_GIST_ID = info.gistId;
          REMU_TOKEN = info.token;
          REMU_GIST_UPDATE_AT = info.updateAt || '';
          return getGist({ gistId: info.gistId, token: info.token });
        })
        .then(({ data }) => {
          return updateLocal(data).then(() => {
            message = { status: 'success' };
            sendResponse(message);
          });
        })
        .catch(() => {
          message = { status: 'error' };
          sendResponse(message);
        });
    }
  } else {
    message = {
      status: 'error',
    };

    sendResponse(message);
  }
});
