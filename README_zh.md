# Bob Plugin - Japanese Furigana (日文假名标注)

这是一个 [Bob](https://bobtranslate.com/) 插件，使用 [Yahoo JAPAN Furigana API](https://developer.yahoo.co.jp/webapi/jlp/furigana/v2/furigana.html) 将日文汉字转换为平假名（Furigana）。

[English](README.md) | [日本語](README_ja.md) | [中文](README_zh.md)

## 功能

- **汉字转平假名**：使用 Yahoo JAPAN 的高精度 Furigana API。
- **纯假名输出**：例如 `漢字` 转换为 `かんじ`。
- **保留格式**：保留原文的换行和结构。

## 安装

1. 下载源代码或 Release 版本。
2. 将文件夹 `bob-plugin-hiragana` 重命名为 `Input.bobplugin`（或任何以 `.bobplugin` 结尾的名称）。
3. 双击 `.bobplugin` 文件即可安装到 Bob。
4. 或者，打开 Bob 偏好设置 > **插件 (Plugins)** > **文本翻译 (Text Translate)**，点击 `+`，选择插件文件夹。

## 配置

本插件需要 **Yahoo JAPAN Client ID (App ID)** 才能工作。

1. 前往 [Yahoo JAPAN Developer Dashboard](https://e.developer.yahoo.co.jp/dashboard/) 创建一个应用（Client side）以获取 **Client ID**。
2. 在 Bob 偏好设置 > **插件** > **Japanese Furigana**：
   - 点击 **设置**（齿轮图标）。
   - 将你的 **Client ID** 粘贴到 "Yahoo Client ID" 栏中。

## 使用

1. 打开 Bob 的翻译窗口或使用快捷键。
2. 选择 **Japanese Furigana** 作为翻译服务。
3. 输入日文文本。
4. 结果将显示对应的平假名读音。

## 许可证

MIT
