# 23の原則

原則（principle）は、作業の判断を変えるための規則です。名前を覚えることより、どの場面で使い、どこまで適用するかを理解します。poteto-modeは一覧を読み、適用した原則と、それが変えた判断を報告します。

原文：{{src:docs/guide/08-principles.md}}。

## 少ない複雑さで目的を満たす {#skill-principle-laziness-protocol}

原文：{{src:skills/principle-laziness-protocol/SKILL.md}}。

`principle-laziness-protocol`

追加より先に削除を探します。何層もの呼び出しや、単に値を渡すラッパーを増やさず、判断を一つの正本へ集めます。変更量の小ささだけでなく、保守する人が追う情報の少なさを重視します。

新しい信号を型、スキーマ、パイプラインに順番に通したくなったとき、より直接的な経路がないかを先に調べます。豊かな機能を一つの簡潔なAPIに隠すことと、薄い層を積み重ねることは違います。

## データと基盤を先に決める {#skill-principle-foundational-thinking}

原文：{{src:skills/principle-foundational-thinking/SKILL.md}}。

`principle-foundational-thinking`

ロジックを書く前に、主要な型、読み書きの経路、アクセスに合う構造を決めます。すべての後続段階が恩恵を受けるCI、検証基盤、共通型を先に作ります。ただし不要なコードの削除は、その基盤作りよりも前です。

似た行をすべて共通化するのでなく、型やデータモデルの構造をそろえます。並行して動く主体が同じ状態を触るなら、他者が変更しても影響しないかを先に問います。影響するなら隔離を検討します。

## 新しい要件を最初からの前提として考える {#skill-principle-redesign-from-first-principles}

原文：{{src:skills/principle-redesign-from-first-principles/SKILL.md}}。

`principle-redesign-from-first-principles`

新要件を既存設計へ継ぎ足す前に、その要件が初日からあった場合に何を作るかを考えます。影響するファイルを読み、型、文書、例、設計理由まで変更を行き渡らせます。

全体像を考えることは一括変更を意味しません。目標の設計を定めてから、小さな段階で届けます。既存の形を守るためだけのアダプターが増えるとき、再設計を検討する根拠になります。

## 失敗した修正が共有する前提を疑う {#skill-principle-attack-the-premise}

原文：{{src:skills/principle-attack-the-premise/SKILL.md}}。

`principle-attack-the-premise`

同じ前提に立った二つ以上の修正が同じ検証に失敗したら、次の修正より先に前提を一文で書きます。どの処理主体に偏りが集中しているかを、再実行できる調査スクリプトで数えます。

毎回同じ主体が偏りを持つなら、その役割を割り当てる仕組みを調べます。定期的な再配分で補償し続けるより、偏った割り当て自体を除けるかを考えます。主体間が均等なら、この仮説の根拠にはならないので別の原因を探します。

## 追加より先に減らす {#skill-principle-subtract-before-you-add}

原文：{{src:skills/principle-subtract-before-you-add/SKILL.md}}。

`principle-subtract-before-you-add`

不要なコード、重複した検証、内容のない参照を削除してから、新しい構造を作ります。未観測の想定に備えた分岐や検証を足すのではなく、要求された範囲と実際の使われ方を基準にします。

この原則は順序を決めます。古いアダプターを磨いてから捨てるより、不要と確認したものを先に除くほうが、残る設計を把握しやすくなります。

## 読む人が追う層と状態を減らす {#skill-principle-minimize-reader-load}

原文：{{src:skills/principle-minimize-reader-load/SKILL.md}}。

`principle-minimize-reader-load`

読み手の負担を、答えへ届くまでの層の数と、頭に保持する隠れた状態の量で考えます。平坦なファイルでも多数のグローバル変数があれば難しく、分割したコードでも層が単なる転送なら難しくなります。

一か所しか使わないラッパーを畳み、可変状態の範囲を小さくし、同期保存より導出を選びます。新しい層や状態を足すなら、別の場所の負担を少なくともそれだけ減らせるかを確認します。

## 検証できる最終状態へ収束する {#skill-principle-outcome-oriented-execution}

原文：{{src:skills/principle-outcome-oriented-execution/SKILL.md}}。

`principle-outcome-oriented-execution`

明確な段階を持つ書き直しや移行では、中間状態を常に滑らかに保つための一時互換コードを増やさず、目標構造へ向かいます。計画され、範囲が限定され、戻せる中間的な破損は許容します。

どこで一時的な不整合を認めるかを宣言し、作業中の重要な確認を維持します。最終段階では静的検証と実行時検証の両方が必要です。無計画に壊した状態を放置する許可ではありません。

## 使う人の体験を基準に選ぶ {#skill-principle-experience-first}

原文：{{src:skills/principle-experience-first/SKILL.md}}。

`principle-experience-first`

実装の容易さと利用者の体験が衝突したら、体験を優先します。多くの粗い機能より、少数の整った機能を選びます。操作、余白、反応、エラー状態などを主要な作業の流れに合わせます。

利用者は画面を触る人だけではありません。ライブラリを呼ぶ同僚や、次に保守する技術者も含みます。基盤を先に作る原則は作業順序を、この原則は目指す結果を決めます。

## 異なる設計案を具体化する {#skill-principle-exhaust-the-design-space}

原文：{{src:skills/principle-exhaust-the-design-space/SKILL.md}}。

`principle-exhaust-the-design-space`

前例のない操作や複数の妥当な設計がある場合、2〜3個の試作やスケッチを比較します。同じ構造の色違いではなく、構造や使い方が異なる案を用意します。

既存の型が明確な機械的実装、目標が決まった修正、制約から唯一の方法が決まる場合には不要です。比較によって選択が変わりうる仕事に使います。

## 作業または証明を再実行できる道具にする {#skill-principle-build-the-lever}

原文：{{src:skills/principle-build-the-lever/SKILL.md}}。

`principle-build-the-lever`

自明でない編集、移行、分析、検査では、手作業の代わりにcodemod、スクリプト、生成器、共通の作業手順を作ります。最初の一単位から方法を学び、その単位に道具を再実行して手作業の結果と比べます。

価値は速度だけではありません。レビューする人が同じ操作を再実行できます。一回きりの仕事でも、その道具が検証可能性を作るなら意味があります。小さなスクリプトで足りる仕事をフレームワークに広げません。

## 条件分岐より先に対象を構造で表す {#skill-principle-model-the-domain}

原文：{{src:skills/principle-model-the-domain/SKILL.md}}。

`principle-model-the-domain`

互いに矛盾しうる複数の真偽値や、各所に繰り返す形の仮定を、状態機械、型付きモデル、表、レジストリ、イベントのモデルなどへまとめます。何が起きてはいけないかと、どうアクセスするかから構造を選びます。

load、validate、saveという実行順だけで責務を分けると、同じ知識が各段階へ漏れる場合があります。構造の追加が分岐、重複、不正状態を減らさないなら、明快で局所的なコードを残します。

## 検証をシステム境界に集める {#skill-principle-boundary-discipline}

原文：{{src:skills/principle-boundary-discipline/SKILL.md}}。

`principle-boundary-discipline`

CLI引数、設定、ネットワーク、外部APIなど、型付けされていないデータの入口で検証します。内部は名前のあるドメイン型を受け取り、同じ検証を各所で繰り返しません。業務ロジックは純粋な関数、外側の接続部分は薄い処理に分けます。

通信、ストレージ、フレームワークの内部表現を公開APIへそのまま漏らさず、対象の概念を返します。境界で本当に検証したという前提があるから、内側で型を信頼できます。

## 不正な状態を型で作れなくする {#skill-principle-type-system-discipline}

原文：{{src:skills/principle-type-system-discipline/SKILL.md}}。

`principle-type-system-discipline`

状態を任意フィールドの集まりではなく、判別可能な選択肢として表します。意味が違うIDを別の型にし、外部データは入口で解析します。型を無理に断言する代わりに、検証、絞り込み、モデル変更で根拠を与えます。

正本のスキーマから型を導出し、選択肢を増やしたら未処理分をコンパイラーが指摘するようにします。ただ精密にするために型を強くしません。空配列にも定義できる合計は通常の配列でよく、先頭要素を必ず返す処理は非空の構造が必要です。

## 途中からの再実行でも同じ状態へ収束する {#skill-principle-make-operations-idempotent}

原文：{{src:skills/principle-make-operations-idempotent/SKILL.md}}。

`principle-make-operations-idempotent`

二回続けて実行した場合と、前回が途中で落ちた場合を考えます。既存状態を調べ、古い残骸を整理し、生きたセッションを引き継ぐなどして、何回でも正しい終状態へ収束させます。

PIDを使った古いロックの検出、作成順ではなく内容での同等性判断などが原文の例です。結果が残された中間状態に依存するなら、状態を照合して整える段階を追加します。

## 呼び出し元を移して旧APIを削除する {#skill-principle-migrate-callers-then-delete-legacy-apis}

原文：{{src:skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md}}。

`principle-migrate-callers-then-delete-legacy-apis`

新しい内部APIが正しい設計だと決めたら、呼び出し元を一覧化し、移行して、同じ一連の変更で旧APIを消します。古い呼び出しがあること自体を理由に、旧経路を永久に残しません。

適用条件は、外部利用者の後方互換性に依存せず、協調した破壊的変更を吸収できることです。一時アダプターは例外として期限を持たせます。公開APIの互換性を無視して削除する原則ではありません。

## 共有をなくしてから直列化を考える {#skill-principle-separate-before-serializing-shared-state}

原文：{{src:skills/principle-separate-before-serializing-shared-state/SKILL.md}}。

`principle-separate-before-serializing-shared-state`

複数の主体が同じファイル、ブランチ、キー、状態へ書く前に、一つの可変オブジェクトを共有する必要があるかを問います。独立した事実なら、それぞれ専有のファイルやブランチへ書き、読み取り時に集約します。

一つのJSONの別フィールドへ書く場合も、ファイルとしては共有書き込みです。本当に一つの正本が必要な場合だけ、ロック、段階の直列実行、単一の書き手、比較交換などの仕組みで直列化します。注意書きだけでは並行制御になりません。

## 実際の成果物で証明する {#skill-principle-prove-it-works}

原文：{{src:skills/principle-prove-it-works/SKILL.md}}。

`principle-prove-it-works`

コンパイル、更新時刻、担当者の自己報告のような代理指標で完成を推定しません。機能を動かし、実際の値を読み、プロセスや差分そのものを確認します。観測が変なら、システムだけでなく観測方法も疑います。

同じ比較を再現できる決定的なスクリプトがあれば、レビューする人も確認できます。大規模な移行では証拠を後で監査できるよう残します。小さな仕事でも、何を見て成功と判断したかは明らかにします。

## 再現して原因から直す {#skill-principle-fix-root-causes}

原文：{{src:skills/principle-fix-root-causes/SKILL.md}}。

`principle-fix-root-causes`

症状を消すガードを足す前に、再現し、なぜ起きるかをたどります。分からなければログや計測を追加し、実行時の情報を見ます。同じ欠陥のパターンが他にもないか調べます。

再起動後だけ壊れる場合、設定、キャッシュ、ロック、保存済み状態の古さを先に疑います。状態ファイルの消去で直ったなら、その事実は状態検証の不備を調べる根拠です。長いコメントで回避策を弁護するより、原因を直すことを優先します。

## 確認できる小さな単位で進める {#skill-principle-sequence-verifiable-units}

原文：{{src:skills/principle-sequence-verifiable-units/SKILL.md}}。

`principle-sequence-verifiable-units`

一つの変更を検証してから次へ進みます。既知の状態、変更、確認を一組にすれば、失敗を生んだ段階を特定しやすくなります。まとめて変更して最後だけ検証する方法を避けます。

履歴も証明の順に並べます。失敗する回帰テストの後に修正、基準記録の後に改善、不要コードの削除の後に構造変更、という並びです。テストを先に置く場合、その時点の失敗は意図した証拠であり、未確認の破損とは区別します。

## 実装の形ではなく観測できる動作を確かめる {#skill-principle-test-behavior-not-implementation}

原文：{{src:skills/principle-test-behavior-not-implementation/SKILL.md}}。

`principle-test-behavior-not-implementation`

利用者と同じ入口から実際の処理を呼び、具体的な入力に対する結果や副作用を、独立した期待値と比較します。同じ関数で期待値を計算したり、定数をそのまま再掲したりするテストは、欠陥を捉えない場合があります。

原文は、importした関数が何も返さなくてもテストが通るかを問い、弱い確認やモックの呼び出し回数だけの確認を見直します。不存在を確かめる場合は、同じテストで反対条件の存在も確認します。テーブル間の整合性やコンパイル時の型検証は保持対象です。

## 大きな入力を分けて扱う {#skill-principle-guard-the-context-window}

原文：{{src:skills/principle-guard-the-context-window/SKILL.md}}。

`principle-guard-the-context-window`

大量の出力や長い文書は分担して読み、主たる会話には発見と根拠の位置を戻します。頻繁に必要な手順はその場で読める形に置き、一度の作業範囲やファイル数を制限します。

要約は根拠を消すことではありません。再確認できるパスや結果を残し、親が必要な判断をできる密度へ縮めます。読み込みを繰り返すためだけの細かすぎる分割も費用になります。

## 可逆な仕事は進めて結果を示す {#skill-principle-never-block-on-the-human}

原文：{{src:skills/principle-never-block-on-the-human/SKILL.md}}。

`principle-never-block-on-the-human`

コード編集やメモのような可逆でレビュー可能な仕事は、合理的に判断して進め、結果を示して修正を受けます。製品の方向性は人が決め、実行上の判断で毎回止めないという分担です。

この単独原則はforce-push、運用データ削除、外部メッセージなどの不可逆な行為に確認が必要としています。poteto-mode本体のAutonomy節は外部行為を含む別の記述を持ちます。実行時は具体的な依頼と環境の権限を確認し、本書だけから権限を推定しません。

## 繰り返す注意を仕組みにする {#skill-principle-encode-lessons-in-structure}

原文：{{src:skills/principle-encode-lessons-in-structure/SKILL.md}}。

`principle-encode-lessons-in-structure`

同じ注意を二度書いたら、型、lint、メタデータ、実行時検査、スクリプトで強制できるかを考えます。可能なら文章だけに頼らず、その仕組みを作ります。判断が不可欠なら、指示を目立たせ失敗例を添えます。

選べる場合は、その場で最も強い仕組みを選びます。不正な状態をコンパイルできなくする、CIで失敗させる、共通ヘルパーへ集める、実行時に検出する、という違いがあります。記録しただけで終わらず、実装または具体的な作業へつなげます。
