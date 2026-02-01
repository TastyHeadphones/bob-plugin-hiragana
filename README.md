# Bob Plugin - Japanese Furigana

A [Bob](https://bobtranslate.com/) plugin that converts Japanese Kanji text into Furigana (Hiragana) using the [Yahoo JAPAN Furigana API](https://developer.yahoo.co.jp/webapi/jlp/furigana/v2/furigana.html).

## Features

- **Convert Kanji to Hiragana**: Uses Yahoo JAPAN's accurate Furigana API.
- **Pure Kana Output**: `漢字` becomes `かんじ`.
- **Preserves Formatting**: Keeps newlines and structure intact.

## Installation

1. Download the source code or release.
2. Rename the folder `bob-plugin-hiragana` to `Input.bobplugin` (or any name ending in `.bobplugin`).
3. Double-click the `.bobplugin` file to install it in Bob.
4. Alternatively, open Bob Preferences > **Plugins** > **Text Translate**, click `+`, and select the plugin folder.

## Configuration

This plugin requires a **Yahoo JAPAN Client ID (App ID)** to function.

1. Go to the [Yahoo JAPAN Developer Dashboard](https://e.developer.yahoo.co.jp/dashboard/) and create an application (Client side) to get a **Client ID**.
2. In Bob Preferences > **Plugins** > **Japanese Furigana**:
   - Click the **Settings** (gear) icon.
   - Paste your **Client ID** into the "Yahoo Client ID" field.

## Usage

1. Open Bob's translation window or use the shortcut.
2. Select **Japanese Furigana** as the translation service.
3. Input Japanese text.
4. The result will display the Hiragana reading.

## License

MIT
