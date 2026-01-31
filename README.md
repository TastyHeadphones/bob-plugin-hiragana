# Bob Plugin - Japanese Furigana

A [Bob](https://bobtranslate.com/) plugin that converts Japanese Kanji text into Furigana (Kana) using the [Yahoo JAPAN Furigana API](https://developer.yahoo.co.jp/webapi/jlp/furigana/v2/furigana.html).

## Features

- **Convert Kanji to Kana**: Uses Yahoo JAPAN's accurate Furigana API.
- **Two Output Modes**:
  - **Annotated**: `漢字(かんじ)` - Standard reading annotation.
  - **Kana Only**: `かんじ` - Pure Hiragana output.
- **Preserves Formatting**: Keeps newlines and structure intact.

## Installation

1. Download the source code or release.
2. Rename the folder `bob-plugin-hiragana` to `Input.bobplugin` (or any name ending in `.bobplugin`).
3. Double-click the `.bobplugin` file to install it in Bob.
4. Alternatively, open Bob Preferences > **Plugins** > **Text Translate**, click `+`, and select the plugin folder.

## Configuration

This plugin requires a **Yahoo JAPAN Client ID (App ID)** to function, as it uses the Yahoo JAPAN API.

1. Go to the [Yahoo JAPAN Developer Dashboard](https://e.developer.yahoo.co.jp/dashboard/) and create an application (Client side) to get a **Client ID**.
2. In Bob Preferences > **Plugins** > **Japanese Furigana**:
   - Click the **Settings** (gear) icon.
   - Paste your **Client ID** into the "Yahoo Client ID" field.
   - Select your desired **Output Mode** (Annotated or Kana Only).

## Usage

1. Open Bob's translation window or use the shortcut.
2. Select **Japanese Furigana** as the translation service.
3. Input Japanese text.
4. The result will display the phonetic reading according to your settings.

## License

MIT
