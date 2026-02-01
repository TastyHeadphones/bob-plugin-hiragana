# Bob Plugin - Japanese Furigana (日本語ふりがな)

[Yahoo JAPAN Furigana API](https://developer.yahoo.co.jp/webapi/jlp/furigana/v2/furigana.html) を使用して、日本語の漢字をひらがな（ふりがな）に変換する [Bob](https://bobtranslate.com/) プラグインです。

[English](README.md) | [日本語](README_ja.md) | [中文](README_zh.md)

## 特徴

- **漢字をひらがなに変換**: Yahoo JAPAN の高精度なルビ振り API を使用します。
- **かなのみ出力**: 例：`漢字` → `かんじ`。
- **フォーマット保持**: 改行や文構造をそのまま維持します。

## インストール

1. ソースコードまたはリリースをダウンロードします。
2. フォルダ `bob-plugin-hiragana` の名前を `Input.bobplugin` （または `.bobplugin` で終わる任意の名前に変更します。
3. `.bobplugin` ファイルをダブルクリックして Bob にインストールします。
4. または、Bob の環境設定 > **プラグイン** > **テキスト翻訳** を開き、`+` をクリックしてプラグインフォルダを選択します。

## 設定

このプラグインを使用するには **Yahoo JAPAN Client ID (App ID)** が必要です。

1. [Yahoo JAPAN Developer Dashboard](https://e.developer.yahoo.co.jp/dashboard/) にアクセスし、アプリケーション（クライアントサイド）を作成して **Client ID** を取得してください。
2. Bob の環境設定 > **プラグイン** > **Japanese Furigana** にて:
   - **設定**（歯車アイコン）をクリックします。
   - "Yahoo Client ID" フィールドに **Client ID** を貼り付けます。

## 使い方

1. Bob の翻訳ウィンドウを開くか、ショートカットを使用します。
2. 翻訳サービスとして **Japanese Furigana** を選択します。
3. 日本語のテキストを入力します。
4. 結果として、ひらがなの読みが表示されます。

## ライセンス

MIT
