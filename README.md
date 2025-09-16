<p align="center">
<a href="https://chrome.google.com/webstore/detail/remu/bajifjohhghngljcfhkbpcggafpiajdo"><img src="./docs/logo.png" width="100"/></a>
<div align="center">
<span style="font-size:16px;">Remu</span> - <span style="font-size:14px;font-weight:300;">高效管理你的 GitHub Stars 从未如此轻松。</span>
</div>
</p>

## 🎉 Manifest V3 升级完成

本项目已成功升级到 Chrome Extension Manifest V3，现在完全兼容最新的Chrome浏览器！

### 升级亮点
- ✅ 完全兼容 Manifest V3
- ✅ Service Worker 后台脚本
- ✅ 更新的权限系统
- ✅ 更好的安全性和性能

### 推荐替代方案
如果你需要更现代的GitHub Stars管理方案，推荐使用：
- [GitHub Lists](https://docs.github.com/cn/get-started/exploring-projects-on-github/saving-repositories-with-stars#organizing-starred-repositories-with-lists) - GitHub官方的Stars组织功能

---

<div align="center">
 <div><a style="font-size:12px" href="./README.en.md">[English README]</a></div>
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

Remu（レム）是雷姆的非日语假名拼音 😋。

here, 她是一个 Chrome 浏览器插件，通过标签分类来对 GitHub Stars 进行高效管理，借助 Gists 强大能力实现<sup>1</sup>跨平台的数据同步。👏🏻

<sup>1 - Chrome 提供的同步能力（storage.sync）只有 100kb 大小的存储容量，且只能存储 512 项，每项 8kb。如果 repo 数量和标签过多就会有部分数据无法同步，所以我使用 Gists 来进行同步（目前没有容量的限制），顺带还可以查看历史记录。</sup>

<img src="./docs/screenshot.png" width="890" />

## Install

<a href="https://chrome.google.com/webstore/detail/remu/bajifjohhghngljcfhkbpcggafpiajdo"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_128x128.png" width="48" /></a>

[Chrome Web Store](https://chrome.google.com/webstore/detail/remu/bajifjohhghngljcfhkbpcggafpiajdo)

## Feature

- 显示 star 历史
- 显示 star 仓库 / watching 仓库 (默认关闭)
- 添加 Notes
- 仓库设置/编辑/删除标签
- 取消 Star / Download Zip / Clone with HTTPS
- Google 账号同步 Token/GistId, Gist **自动同步**标签数据（默认 6 秒延迟）
- 等等...

### Repo

<img src="./docs/remu-repo.gif" width="890" />

### Tab

<img src="./docs/remu-tab.gif" width="890" />

## Next Feature

- [ ] 多语言
- [ ] 主题
- [ ] TOC
- [ ] 搜索提示
- [ ] 标签定制颜色
- [ ] 支持国内浏览器？

## Screenshot

### Star History

![](images/2019-07-23-21-23-39.png)

### Settings

<img src="./docs/settings.png" width="890" />

## Development

### 环境要求
- Node.js 14+
- Yarn

### 开发步骤

1. 安装依赖：
```shell
yarn install
```

2. 开发模式（监听文件变化）：
```shell
yarn run start
```

3. 构建生产版本：
```shell
yarn run build
```

4. 在Chrome中加载扩展：
   - 打开 `chrome://extensions/`
   - 启用"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择 `dist` 文件夹

### Manifest V3 升级说明

本项目已从 Manifest V2 升级到 V3，主要变化包括：
- Background脚本改为Service Worker
- 权限系统更新
- API调用方式调整
- 内容安全策略优化

详细升级信息请查看 [MANIFEST_V3_UPGRADE.md](./MANIFEST_V3_UPGRADE.md)

## Community

null

## 技术说明

### 隐私保护
因为Google商店的政策问题，现在添加了隐私协议，在使用前需要同意。
**Token 只会存储到本地，不会上传！**

### Manifest V3 兼容性
- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ 其他基于Chromium的浏览器

### 构建要求
由于使用了较旧的webpack版本，在Node.js 17+环境下需要使用legacy OpenSSL provider：
```shell
NODE_OPTIONS=--openssl-legacy-provider yarn build
```

## License

MIT © [zenghongtu](https://github.com/zenghongtu)
