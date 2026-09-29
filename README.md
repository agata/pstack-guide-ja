# pstackガイド 日本語版

Lauren TanのCursorプラグイン **pstack 0.15.5** を解説する非公式の日本語書籍です。現在の本書の版は `0.15.5-ja.1` です。

[韓国語解説書](https://github.com/jayjongcheolpark/pstack-guide-ko)をフォークし、9部・22章・4付録の構成とEPUB/PDF生成ツールを活用しています。本文の技術説明は、韓国語の重訳ではなく、[固定した英語原文](https://github.com/cursor/plugins/tree/adf3218ca2f5b9971eedc07a76bef22df7701539/pstack)を読んで日本語で執筆しました。逐語訳ではなく、目的、手順、検証、例外を説明する解説書です。

AIの支援で作成した非公式版です。原著者・Cursorによる監修、承認、保証はありません。解釈が異なる場合は固定した原文を優先してください。韓国語版の配布許諾を、日本語版の個別承認とは扱いません。

## 読む・ダウンロードする

[日本語版のリリース](https://github.com/agata/pstack-guide-ja/releases)から取得できます。

- `pstack-guide-0.15.5-ja.1.epub`：電子書籍リーダー向け。日本語メタデータ、リンク付き目次、画面のダークモードに対応。
- `pstack-guide-0.15.5-ja.1.pdf`：152 × 225 mm。日本語フォントとページ番号付き目次を収録。
- `SHA256SUMS`：上記2ファイルのチェックサム。

原稿は [manuscript](manuscript/) で読めます。各スキルとプレイブックに、固定コミットの原文リンクがあります。

## 構成

1. 始める：pstackの役割、導入、モデル設定。
2. 仕事の入り口：poteto-modeと23プレイブック。
3. 理解する：how、why、teach、recall。
4. 設計する：architect、arena、swarm、figure-it-out、23原則。
5. 直して検証する：tdd、blast-radius、interrogate、検証スキル。
6. 文章とコードを整える：unslop、technical-writing、no-comments、TypeScript。
7. 自分のやり方に合わせる：automate-me、reflect、判断記録、bro。
8. 自動化する：make-bot-uiとbenny。
9. 実践する：夜間実行、依頼例、よくある失敗。

付録は早見表、用語集、選択フロー、著作権表示です。47スキル、23プレイブック、2エージェント、bennyの導入・分類・再現手順を扱います。補助スクリプトの逐行解説や、全英文の翻訳は含みません。

本書独自の例は「例（本書独自の例。原文にはありません）」、原文を越える解釈は「解説（本書の解釈。原文の規定ではありません）」と表示します。

## ビルド

BunとChromeまたはChromiumが必要です。Linuxの標準パスとmacOSのChromeを検出します。別の場所なら `CHROME_PATH` を指定します。

```sh
bun install --frozen-lockfile
bun tools/build.mjs
```

成果物は `dist/` に生成します。PDFはNoto Serif JP、Noto Sans JP、JetBrains Monoを使用します。EPUBにはフォントを埋め込みません。

原文を固定して、構造と網羅性を確認します。

```sh
git clone https://github.com/cursor/plugins.git ../cursor-plugins
git -C ../cursor-plugins checkout adf3218ca2f5b9971eedc07a76bef22df7701539
PSTACK_SRC=../cursor-plugins/pstack bun tools/check.mjs
bun tools/check-layout.mjs
bun tools/check-pdf.mjs
```

`check.mjs` は章間リンク、原文パス、47スキル・23プレイブック・2エージェントの収録、日本語の言語情報、版、EPUB規格を検査します。`check-layout.mjs` は全EPUB文書を幅390pxで確認します。`check-pdf.mjs` はPDFの日本語テキスト、欠落文字、原稿との対応を確認します。PDFは画像にして目視も行います。

## 出典・編集方針

[SOURCE.md](SOURCE.md) に固定した原文と派生元、[STYLE.md](STYLE.md) に日本語の編集方針、[PROGRESS.md](PROGRESS.md) に確認結果を記録します。対象版の `orchestrate` と通常PR手順に残るGraphite方針の違いなど、原文の不一致は本文で明示しています。

訂正は [Issues](https://github.com/agata/pstack-guide-ja/issues) またはPRへ、章名と原文の固定リンクを添えてください。

## ライセンス

MIT。原著pstackはCopyright (c) 2026 Lauren Tan、韓国語解説書の構成・出版ツールはCopyright (c) 2026 Jay Parkです。[LICENSE](LICENSE) と [NOTICE.md](NOTICE.md) の表示を維持しています。日本語版も同じMITライセンスで配布します。
