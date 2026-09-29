# 日本語版の作業記録

## 執筆

2026年9月29日にpstack 0.15.5の固定英語原文から日本語本文を作成しました。韓国語版の9部・22章・4付録を維持し、37原稿ファイルを日本語化しています。47スキル、23プレイブック、2エージェント、bennyの手順を説明します。AIによる原文照合と編集であり、人間の専門家による校閲済みとは表示しません。

## 原文の差異として記録した点

- orchestrateのStack safetyはGraphiteを前提にする一方、通常のPR手順とautopilotはghまたはOriginを使いGraphiteを要求しません。
- 通常PRのready指定と、bennyのdraft限定を区別します。
- never-block-on-the-humanとpoteto-mode本体で外部操作の境界表現が異なります。
- 各スキル固有の確認待ちを維持します。architectは任意、reflectの変更適用は明示的な承認が必要です。

## 検証

- `bun tools/build.mjs`：EPUBとPDFを生成。PDFは106ページ。
- `PSTACK_SRC=../cursor-plugins/pstack bun tools/check.mjs`：原文パス、内部リンク、37文書、47スキル、23プレイブック、2エージェント、版情報、日本語タグが合格。
- EPUBCheck：valid=true、エラー0、警告0。
- `bun tools/check-layout.mjs`：全EPUB文書で幅390pxの横方向のはみ出しなし。
- ダークパレット：25組のコントラスト検査が合格。
- `bun tools/check-pdf.mjs`：原稿の日本語本文1,328断片をPDFと照合。欠落なし。日本語33,232文字、置換文字0。
- PDFの全ページを縮小一覧で確認し、表紙、本文、図、表、出典段落、ライセンスを拡大して確認。改行とページ分断を修正後に再生成・再確認。
- `git diff --check`：合格。

使用ランタイムはBun 1.4.2、生成はChromiumとリポジトリの固定依存関係です。静的な原文照合と書籍の検査を実施したもので、掲載する全pstackワークフローをCursor上で実運用した検証ではありません。
