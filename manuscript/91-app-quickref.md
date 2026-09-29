# スキルとプレイブックの早見表

対象版の47スキルと23プレイブックです。benny内部の手順は通常スキルの数に含めません。各項目から本書の説明へ移動できます。原文リンクは移動先の節にあります。

## 一般スキル

| 識別子 | 説明 |
| --- | --- |
| [`architect`](architect.md#skill-architect) | 呼び出し側から設計する |
| [`arena`](arena-swarm.md#skill-arena) | arena：同じ課題の複数案を統合する |
| [`automate-me`](personal.md#skill-automate-me) | automate-me |
| [`blast-radius`](tdd-blast.md#skill-blast-radius) | blast-radius：差分の外への影響を調べる |
| [`bro`](utility.md#skill-bro) | bro |
| [`create-verification-skill`](verification.md#skill-create-verification-skill) | create-verification-skill |
| [`figure-it-out`](arena-swarm.md#skill-figure-it-out) | figure-it-out：仕事に合わせた手順を作る |
| [`how`](how.md#skill-how) | 対象と出力 |
| [`interrogate`](interrogate.md#skill-interrogate) | レビューの契約 |
| [`maintain-verification-skill`](verification.md#skill-maintain-verification-skill) | maintain-verification-skill |
| [`make-bot-ui`](benny.md#skill-make-bot-ui) | make-bot-ui |
| [`no-comments`](code-hygiene.md#skill-no-comments) | no-comments |
| [`poteto-mode`](poteto-mode.md#skill-poteto-mode) | 依頼を手順へつなぐ |
| [`recall`](teach-recall.md#skill-recall) | recall |
| [`reflect`](personal.md#skill-reflect) | reflect |
| [`setup-pstack`](setup.md#skill-setup-pstack) | setup-pstack |
| [`show-me-your-work`](personal.md#skill-show-me-your-work) | show-me-your-work |
| [`swarm`](arena-swarm.md#skill-swarm) | swarm：分担と競争を集約する |
| [`tdd`](tdd-blast.md#skill-tdd) | tdd：修正前の失敗を実行できる形にする |
| [`teach`](teach-recall.md#skill-teach) | teach |
| [`technical-writing`](writing.md#skill-technical-writing) | technical-writing |
| [`typescript-best-practices`](code-hygiene.md#skill-typescript-best-practices) | typescript-best-practices |
| [`unslop`](writing.md#skill-unslop) | unslop |
| [`why`](why.md#skill-why) | 動機と制約を探す |

## 原則スキル

| 識別子 | 説明 |
| --- | --- |
| [`principle-attack-the-premise`](principles.md#skill-principle-attack-the-premise) | 失敗した修正が共有する前提を疑う |
| [`principle-boundary-discipline`](principles.md#skill-principle-boundary-discipline) | 検証をシステム境界に集める |
| [`principle-build-the-lever`](principles.md#skill-principle-build-the-lever) | 作業または証明を再実行できる道具にする |
| [`principle-encode-lessons-in-structure`](principles.md#skill-principle-encode-lessons-in-structure) | 繰り返す注意を仕組みにする |
| [`principle-exhaust-the-design-space`](principles.md#skill-principle-exhaust-the-design-space) | 異なる設計案を具体化する |
| [`principle-experience-first`](principles.md#skill-principle-experience-first) | 使う人の体験を基準に選ぶ |
| [`principle-fix-root-causes`](principles.md#skill-principle-fix-root-causes) | 再現して原因から直す |
| [`principle-foundational-thinking`](principles.md#skill-principle-foundational-thinking) | データと基盤を先に決める |
| [`principle-guard-the-context-window`](principles.md#skill-principle-guard-the-context-window) | 大きな入力を分けて扱う |
| [`principle-laziness-protocol`](principles.md#skill-principle-laziness-protocol) | 少ない複雑さで目的を満たす |
| [`principle-make-operations-idempotent`](principles.md#skill-principle-make-operations-idempotent) | 途中からの再実行でも同じ状態へ収束する |
| [`principle-migrate-callers-then-delete-legacy-apis`](principles.md#skill-principle-migrate-callers-then-delete-legacy-apis) | 呼び出し元を移して旧APIを削除する |
| [`principle-minimize-reader-load`](principles.md#skill-principle-minimize-reader-load) | 読む人が追う層と状態を減らす |
| [`principle-model-the-domain`](principles.md#skill-principle-model-the-domain) | 条件分岐より先に対象を構造で表す |
| [`principle-never-block-on-the-human`](principles.md#skill-principle-never-block-on-the-human) | 可逆な仕事は進めて結果を示す |
| [`principle-outcome-oriented-execution`](principles.md#skill-principle-outcome-oriented-execution) | 検証できる最終状態へ収束する |
| [`principle-prove-it-works`](principles.md#skill-principle-prove-it-works) | 実際の成果物で証明する |
| [`principle-redesign-from-first-principles`](principles.md#skill-principle-redesign-from-first-principles) | 新しい要件を最初からの前提として考える |
| [`principle-separate-before-serializing-shared-state`](principles.md#skill-principle-separate-before-serializing-shared-state) | 共有をなくしてから直列化を考える |
| [`principle-sequence-verifiable-units`](principles.md#skill-principle-sequence-verifiable-units) | 確認できる小さな単位で進める |
| [`principle-subtract-before-you-add`](principles.md#skill-principle-subtract-before-you-add) | 追加より先に減らす |
| [`principle-test-behavior-not-implementation`](principles.md#skill-principle-test-behavior-not-implementation) | 実装の形ではなく観測できる動作を確かめる |
| [`principle-type-system-discipline`](principles.md#skill-principle-type-system-discipline) | 不正な状態を型で作れなくする |

## プレイブック

| 識別子 | 説明 |
| --- | --- |
| [`authoring-a-skill`](playbooks-long.md#playbook-authoring-a-skill) | スキルを作る・直す：authoring-a-skill |
| [`autonomous-run`](playbooks-long.md#playbook-autonomous-run) | 完了条件まで続ける：autonomous-run |
| [`autopilot-full`](playbooks-long.md#playbook-autopilot-full) | 独立PRをマージまで進める：autopilot-full |
| [`autopilot-stack`](playbooks-long.md#playbook-autopilot-stack) | 検証済みスタックを引き渡す：autopilot-stack |
| [`babysit`](playbooks-pr.md#playbook-babysit) | マージ可能まで整える：babysit |
| [`bug-fix`](playbooks-work.md#playbook-bug-fix) | バグ修正：bug-fix |
| [`eval`](playbooks-long.md#playbook-eval) | スキル変更を盲検で評価する：eval |
| [`feature`](playbooks-work.md#playbook-feature) | 機能追加：feature |
| [`hillclimb`](playbooks-work.md#playbook-hillclimb) | 一つの指標を継続改善する：hillclimb |
| [`investigation`](playbooks-work.md#playbook-investigation) | 調査：investigation |
| [`multi-phase-plan`](playbooks-long.md#playbook-multi-phase-plan) | 複数段階の計画を作る：multi-phase-plan |
| [`opening-a-pr`](playbooks-pr.md#playbook-opening-a-pr) | レビューできるPRを開く：opening-a-pr |
| [`orchestrate`](playbooks-long.md#playbook-orchestrate) | プロジェクト全体を調整する：orchestrate |
| [`pause-safely`](playbooks-long.md#playbook-pause-safely) | 安全に中断する：pause-safely |
| [`perf-issue`](playbooks-work.md#playbook-perf-issue) | 単発の性能改善：perf-issue |
| [`prototype`](playbooks-work.md#playbook-prototype) | 意思決定のための試作：prototype |
| [`refactoring`](playbooks-work.md#playbook-refactoring) | 動作を保つ構造変更：refactoring |
| [`runtime-forensics`](playbooks-work.md#playbook-runtime-forensics) | 稼働中の診断：runtime-forensics |
| [`session-pickup`](playbooks-long.md#playbook-session-pickup) | 前の作業を引き継ぐ：session-pickup |
| [`shipping`](playbooks-pr.md#playbook-shipping) | 検証済みの範囲をマージする：shipping |
| [`trace-forensics`](playbooks-work.md#playbook-trace-forensics) | 取得済みトレースの診断：trace-forensics |
| [`visual-parity`](playbooks-work.md#playbook-visual-parity) | 見た目の同等性：visual-parity |
| [`worktree-cleanup`](playbooks-long.md#playbook-worktree-cleanup) | worktreeとシミュレーターの整理：worktree-cleanup |
