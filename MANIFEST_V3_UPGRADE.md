# Chrome扩展 Manifest V3 升级指南

## 升级概述

本项目已成功从 Manifest V2 升级到 Manifest V3。以下是主要的更改内容：

## 主要更改

### 1. Manifest.json 更新

- **manifest_version**: 从 `2` 更新到 `3`
- **permissions**: 移除了 `clipboardWrite`（项目使用JavaScript库处理剪贴板）
- **host_permissions**: 将 `https://api.github.com/*` 从 `permissions` 移动到新的 `host_permissions` 字段
- **browser_action**: 更名为 `action`
- **background**: 从 `page` 改为 `service_worker`，指向 `js/background.bundle.js`
- **content_security_policy**: 更新格式，移除 `unsafe-eval`

### 2. Background脚本更新

**文件**: `src/background/index.ts`
- `chrome.browserAction.onClicked` → `chrome.action.onClicked`
- `chrome.extension.getURL` → `chrome.runtime.getURL`

**文件**: `src/background/utils.ts`
- `chrome.browserAction.setTitle` → `chrome.action.setTitle`
- `chrome.browserAction.setBadgeText` → `chrome.action.setBadgeText`
- `chrome.browserAction.setBadgeBackgroundColor` → `chrome.action.setBadgeBackgroundColor`

### 3. 工具函数更新

**文件**: `src/utils.ts`
- `chrome.extension.getURL` → `chrome.runtime.getURL`

### 4. 依赖更新

**文件**: `package.json`
- `@types/chrome`: 从 `^0.0.86` 更新到 `^0.0.200` 以支持 Manifest V3 API

## 兼容性说明

### 保持不变的功能
- Content Scripts 功能完全兼容
- Storage API 使用方式不变
- 消息传递机制保持一致
- 剪贴板功能通过 `copy-to-clipboard` 库实现，无需Chrome权限

### Service Worker 注意事项
- Background脚本现在作为Service Worker运行
- 不再有持久的背景页面
- 全局变量在Service Worker休眠时会丢失，但项目已正确使用Chrome Storage API

## 构建和部署

1. 安装更新的依赖：
   ```bash
   yarn install
   ```

2. 构建扩展：
   ```bash
   yarn build
   ```

3. 在Chrome中加载扩展：
   - 打开 `chrome://extensions/`
   - 启用"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择 `dist` 文件夹

## 测试建议

升级后建议测试以下功能：
- [ ] 扩展图标点击功能
- [ ] GitHub页面上的标签功能
- [ ] 数据同步功能
- [ ] 选项页面
- [ ] 剪贴板复制功能
- [ ] 徽章显示功能

## 潜在问题

1. **Service Worker生命周期**: 如果发现功能异常，可能是Service Worker休眠导致的状态丢失
2. **CSP限制**: 如果有动态代码执行需求，需要重构为静态实现
3. **权限变化**: 确保所有必要的权限都已正确配置

## 回滚方案

如果需要回滚到Manifest V2，可以恢复以下文件的更改：
- `public/manifest.json`
- `src/background/index.ts`
- `src/background/utils.ts`
- `src/utils.ts`
- `package.json`

升级完成后，扩展应该能够在支持Manifest V3的Chrome浏览器中正常运行。