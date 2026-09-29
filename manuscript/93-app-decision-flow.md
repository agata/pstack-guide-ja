# スキルを選ぶ流れ

原文：{{src:skills/poteto-mode/SKILL.md}}、{{src:docs/guide/02-poteto-mode.md}}、{{src:docs/guide/04-design.md}}。

通常は `/poteto-mode` に目的と完了条件を伝えます。この付録は、個別のスキルを直接選ぶ場合の整理です。図と表は原文の使い分けを本書でまとめたものです。

## 作業の入り口

```flow 目的に合う入り口
start 何を知る、または変えるのか
step 現状の説明が必要か
  alt 動作 | how
  alt 理由 | why
step 設計を比べたいか
  alt 境界や型 | architect
  alt 同じ課題の候補 | arena
step 範囲を分けて確認したいか
  alt 分担または競争 | swarm
step 差分を疑ってレビューしたいか
  alt 複数モデルのレビュー | interrogate
end 仕事全体を進めたい | poteto-mode
```

## 実装と検証

| 状況 | 選択 |
| --- | --- |
| 明確な不具合を直す | [bug-fix](playbooks-work.md#playbook-bug-fix) |
| 安価な回帰テストを先に作る | [tdd](tdd-blast.md#skill-tdd) |
| 新しい動作を追加する | [feature](playbooks-work.md#playbook-feature) |
| 動作を保って構造を変える | [refactoring](playbooks-work.md#playbook-refactoring) |
| 観測済みの遅さを直す | [perf-issue](playbooks-work.md#playbook-perf-issue) |
| 一指標を繰り返し改善する | [hillclimb](playbooks-work.md#playbook-hillclimb) |
| 実アプリを操作する方法がない | [create-verification-skill](verification.md#skill-create-verification-skill) |
| 検証手順が古い | [maintain-verification-skill](verification.md#skill-maintain-verification-skill) |
| 別の場所への影響が心配 | [blast-radius](tdd-blast.md#skill-blast-radius) |

## 継続と引き渡し

| 目的 | 選択 |
| --- | --- |
| 一つの目標まで続ける | [autonomous-run](playbooks-long.md#playbook-autonomous-run) |
| 専用の厳密な手順を組む | [figure-it-out](arena-swarm.md#skill-figure-it-out) |
| 独立PRをマージまで任せる | [autopilot-full](playbooks-long.md#playbook-autopilot-full) |
| 人がマージするスタックを作る | [autopilot-stack](playbooks-long.md#playbook-autopilot-stack) |
| 特定の作業を再開する | [session-pickup](playbooks-long.md#playbook-session-pickup) |
| 中断して引き継げる状態にする | [pause-safely](playbooks-long.md#playbook-pause-safely) |
| 自分の好みを継続的な規則にする | [automate-me](personal.md#skill-automate-me) |
| 今回の学びを規則へ反映する | [reflect](personal.md#skill-reflect) |
