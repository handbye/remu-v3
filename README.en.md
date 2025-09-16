<p align="center">
<a href="https://chrome.google.com/webstore/detail/remu/bajifjohhghngljcfhkbpcggafpiajdo"><img src="./docs/logo.png" width="100"/></a>
<div align="center">
<span style="font-size:16px;">Remu</span> - <span style="font-size:14px;font-weight:300;">Managing your GitHub Starred Repository efficiently has never been easier.</span>
</div>
</p>

## 🎉 Manifest V3 Upgrade Complete

This project has been successfully upgraded to Chrome Extension Manifest V3, now fully compatible with the latest Chrome browsers!

### Upgrade Highlights
- ✅ Full Manifest V3 compatibility
- ✅ Service Worker background scripts
- ✅ Updated permission system
- ✅ Better security and performance

### Recommended Alternative
For a more modern GitHub Stars management solution, we recommend:
- [GitHub Lists](https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars#organizing-starred-repositories-with-lists) - GitHub's official Stars organization feature

---

<div align="center">
 <div><a style="font-size:12px" href="./README.md">[中文 README]</a></div>
  <div>
    <a href="https://github.com/zenghongtu/Remu/releases"><img src="https://camo.githubusercontent.com/d0ccf63e875fba0eb2d61287382ade6ae59ed1ad/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f72656c656173652f7a656e67686f6e6774752f4d6f622e7376673f7374796c653d666c61742d737175617265" alt="Current Release" data-canonical-src="https://img.shields.io/github/release/zenghongtu/Remu.svg?style=flat-square" style="max-width:100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/3bb863d4a8a6ddd0c2c4b4c67dab6bb58dee9b07/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f7a656e67686f6e6774752f4d6f622e7376673f7374796c653d666c61742d737175617265"><img src="https://camo.githubusercontent.com/3bb863d4a8a6ddd0c2c4b4c67dab6bb58dee9b07/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f7a656e67686f6e6774752f4d6f622e7376673f7374796c653d666c61742d737175617265" alt="License" data-canonical-src="https://img.shields.io/github/license/zenghongtu/Remu.svg?style=flat-square" style="max-width:100%;"></a>
  </div>
   Made with:
  <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" height=20 />
  &
  <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" height=20 />
</div>

---

## What is Remu?

Remu（レム） is rem's non-Japanese kana pinyin.

Here, she is a Chrome browser plug-in, which manages GitHub Stars efficiently through label classification, and realizes cross-platform data synchronization by virtue of Gists' powerful capability<sup>1</sup>.

<sup>1 - The sync capability (storage.sync) provided by Chrome is only 100kb in size and can only store 512 items, 8kb each. If there are too many repos and labels, some of the data will not be synchronized, so I use Gists for synchronization (there is currently no capacity limit), and by the way, I can view the history.</sup>

<img src="./docs/screenshot.png" width="890" />

## Install

<a href="https://chrome.google.com/webstore/detail/remu/bajifjohhghngljcfhkbpcggafpiajdo"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_128x128.png" width="48" /></a>

[Chrome Web Store](https://chrome.google.com/webstore/detail/remu/bajifjohhghngljcfhkbpcggafpiajdo)

## Feature

- Show starred repositories / watching repositories(**default close**)
- Add Notes
- Set / Edit / Delete Tags
- Search by title / description / readme(**default close**)
- UnStarred Repo / Download Zip / Clone with HTTPS
- Google Account Sync Token/GistId, Gist ** Auto Sync ** tag data (default 6 second delay)
- and many more...

### Repo

<img src="./docs/remu-repo.gif" width="890" />

### Tab

<img src="./docs/remu-tab.gif" width="890" />

## Next Feature

- [x] star history
- [ ] multi-language
- [ ] theme
- [ ] toc
- [ ] search tips
- [ ] tag custom color

## Screenshot

### Star History

![](images/2019-07-22-09-50-21.png)


### Settings

<img src="./docs/settings.png" width="890" />

### Token Scopes

<img src="./docs/token-scope.png" width="890" />

## Development

### Requirements
- Node.js 14+
- Yarn

### Development Steps

1. Install dependencies:
```shell
yarn install
```

2. Development mode (watch for changes):
```shell
yarn run start
```

3. Build for production:
```shell
yarn run build
```

4. Load extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

### Manifest V3 Upgrade Notes

This project has been upgraded from Manifest V2 to V3, with major changes including:
- Background scripts converted to Service Workers
- Updated permission system
- Adjusted API calls
- Optimized Content Security Policy

For detailed upgrade information, see [MANIFEST_V3_UPGRADE.md](./MANIFEST_V3_UPGRADE.md)

## Technical Notes

### Privacy Protection
Due to Google Store policy requirements, a privacy agreement has been added and must be agreed to before use.
**Tokens are only stored locally and will not be uploaded!**

### Manifest V3 Compatibility
- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Other Chromium-based browsers

### Build Requirements
Due to the use of older webpack versions, Node.js 17+ environments require the legacy OpenSSL provider:
```shell
NODE_OPTIONS=--openssl-legacy-provider yarn build
```

## Community

<img src="./docs/weixin-group.png" width="400" />

## License

MIT © [zenghongtu](https://github.com/zenghongtu)
