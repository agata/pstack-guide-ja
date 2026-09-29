# 原文と派生元

## 技術説明の原文

- リポジトリ： https://github.com/cursor/plugins
- 対象：`pstack/`
- pstack版：`0.15.5`
- 固定コミット：`adf3218ca2f5b9971eedc07a76bef22df7701539`
- 参照日：2026年9月29日
- 著作権：Copyright (c) 2026 Lauren Tan、MIT。

`README.md`、`docs/guide/`、47個の `skills/*/SKILL.md`、23個の `skills/poteto-mode/playbooks/*.md`、2個の `agents/*.md`、bennyのREADME、FOR_AGENTS、導入・分類・再現の各手順を基準に執筆しています。補助資料は節に必要なものをリンクします。本文にリンクがあることは、その補助ファイル全体を逐語訳したことを意味しません。

原文は本書リポジトリ外のcheckoutで参照します。`{{src:...}}` はビルド時に上記SHAへのpermalinkへ展開します。現行mainの内容と混ぜません。

## 構成と出版ツールの派生元

- リポジトリ： https://github.com/jayjongcheolpark/pstack-guide-ko
- 元の書籍版：`0.15.5-ko.3`
- フォーク時点：`81a6eec37fa5186fe598113cf3cb507f6b0c3e10`。
- 著作権：Copyright (c) 2026 Jay Park、MIT。

9部・22章・4付録、MarkdownからEPUB/PDFを生成する仕組み、表紙とSVGフローの生成、6枚の原著由来の図版を引き継ぎます。日本語本文は英語原文を基準に再執筆し、フォント、言語タグ、目次ラベル、組版、検査を日本語向けに変更しています。

## 版管理

本書の版は `tools/lib/manuscript.mjs` の `SOURCE.version` と `BOOK_REVISION` から `0.15.5-ja.1` の形式で生成します。pstackを変えずに本だけを直す場合は末尾の改訂番号を増やします。
