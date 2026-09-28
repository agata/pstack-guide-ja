# 설치와 첫 사용

원문: {{src:docs/guide/01-setup.md}} {{src:skills/setup-pstack/SKILL.md}} {{src:README.md}}

이 장에서는 플러그인을 설치하고, pstack이 쓸 모델을 고르고, 첫 작업을 실행합니다. 설정은 명령 한 줄과 짧은 대화면 끝납니다.

## 플러그인 설치

Cursor 채팅에서 다음을 실행합니다.

```text
/add-plugin pstack
```

Cursor가 설치되었다는 확인을 보여 줍니다.

## 모델 고르기

이어서 다음을 실행합니다.

```text
/setup-pstack
```

`/setup-pstack`은 접근 가능한 모델을 감지하고, 추론 예산을 묻고, 역할별로 어떤 모델을 쓸지 보여 준 다음 원하는 것을 묻습니다. 질문에 답하면 `~/.cursor/rules/pstack-models.mdc`를 씁니다. 모든 pstack 스킬이 읽는 작은 규칙 파일입니다.

바꾸고 싶은 것만 바꾸면 됩니다. 규칙 파일에 줄이 없는 역할은 스킬의 기본값을 그대로 씁니다. 기본값으로 되돌리려면 그 역할의 줄을 지웁니다. `/setup-pstack`을 다시 실행하면 계열이나 목록, 별칭(`inherit-parent`, `auto`)으로 바꿔 둔 역할은 유지하고, 강도만 다른 슬러그는 새 예산에 맞춰 다시 계산합니다.

**Auto를 쓰는 경우.** 역할의 값을 `inherit-parent` 또는 `auto`로 정하면 pstack은 서브에이전트의 `model` 필드를 생략하고, 서브에이전트는 부모 채팅의 모델을 물려받습니다. 두 값은 같은 뜻이고, 둘 다 모델 슬러그(slug, 모델의 식별 문자열)가 아닙니다. 패널 역할의 값은 목록이고 항목마다 서브에이전트가 하나씩 뜨므로, 목록의 길이가 패널의 크기를 정합니다. 설정은 `swarm workers`도 함께 정합니다. `/swarm`의 모든 워커가 쓰는 기본 모델이고, 경주(race)에서 팔(arm)마다 모델을 지정하면 그것이 우선합니다.

**0.15.3 이전에 만든 규칙 파일.** 0.15.3 이전에 쓴 규칙은 옛 기본 모델을 고정해 둡니다. 그 역할의 줄을 지우거나 파일을 지운 다음 `/setup-pstack`을 다시 실행하십시오.

### 기본 모델 구성

README가 밝히는 기본 구성은 모델의 강점에 따라 작업을 나누는 것입니다. 코드를 쓰는 위임(기능, 리팩터링, 버그 수정, 성능, hillclimb)은 grok에게 가고, 가장 어려운 변경과 글쓰기, 판단은 opus 5.5로 갑니다. 기본 패널은 opus 5.5, sol, grok입니다. `/setup-pstack`이 이 모두를 바꿀 수 있습니다.

## 검증 스킬 제안을 받을지 정하기

설정의 마지막에 `/setup-pstack`은 프로젝트에 앱 동작을 증명할 방법이 있는지 봅니다. `verify-*` 스킬이나 기존 하니스(harness, 앱을 구동하고 검사하는 테스트 도구)가 있는지 확인합니다. 둘 다 없으면 `/create-verification-skill`로 하나 만들지 한 번 묻습니다.

승낙하면 `.cursor/skills/verify-<app>/`를 씁니다. 에이전트가 사용자처럼 앱을 구동하는 법을 알려 주는 프로젝트 전용 스킬입니다. 넘겨주기 전에 그 스킬이 실제로 동작하는지 한 번 증명합니다. 거절하면 설정은 그냥 넘어갑니다. `/create-verification-skill`은 언제든 직접 실행할 수 있고, 이 스킬은 [검증 스킬 장](verification.md)에서 다룹니다.

설정이 끝나면 새 채팅을 시작하십시오. 모델 규칙은 새 세션에 적용됩니다.

## 첫 작업 실행

실제 작업이면서 작은 것을 골라, 동료에게 말하듯 설명합니다.

```text
/poteto-mode 이 명령에 --json 플래그를 추가해 줘. 텍스트 출력은 바이트 단위로 그대로여야 해. 두 형식 모두 검증해 줘.
```

할 일 목록을 보십시오. 첫 항목들은 맞춰진 플레이북의 단계를 그대로 복사한 것이고, 이 프롬프트에서는 Feature 플레이북입니다. `/poteto-mode`가 어떤 단계를 건너뛰면 그 단계가 `skip: <이유>`와 함께 목록에 남으므로, 무엇을 하지 않기로 했는지 볼 수 있습니다.

그다음부터는 평소처럼 후속 질문을 하면 됩니다. `/poteto-mode`는 스티키 모드라서, 그만하라고 말하기 전까지 대화 내내 켜져 있습니다.

## setup-pstack {#skill-setup-pstack}

원문: {{src:skills/setup-pstack/SKILL.md}}

> pstack이 역할별로 어떤 모델을, 어떤 추론 예산으로 쓸지 정하고, 스킬의 기본값을 덮어쓰는 항상 적용 규칙을 씁니다.

### 언제 쓰는가

처음 설치한 직후, 그리고 모델 선택을 바꾸고 싶을 때 씁니다. 원문의 `description`은 `/setup-pstack`, "configure pstack models", "pstack budget", pstack의 모델 선택 변경을 트리거로 듭니다.

### 동작 방식

이 스킬이 하는 일은 `~/.cursor/rules/pstack-models.mdc`를 쓰는 것입니다. 항상 적용되는(always-applied) 규칙으로, 역할마다 모델을 정합니다. 단계는 일곱 개입니다.

1. **사용 가능한 모델 감지.** 이 세션에서 `Task` 서브에이전트에 넘길 수 있는 모델 슬러그를 나열합니다. 이것이 믿을 만한 출처입니다. Cursor가 사용자가 쓸 수 있는 모델을 나열하는 API나 CLI를 따로 제공하면 완전성을 위해 그쪽을 우선합니다. 하나도 감지하지 못하면 사용자에게 접근 가능한 슬러그를 붙여 넣게 합니다. 확인하지 못한 실제 슬러그는 절대 쓰지 않습니다. 별칭 `inherit-parent`와 `auto`는 감지된 슬러그가 아니지만 항상 유효합니다.
2. **현재 상태 읽기.** 기본 역할-모델 매핑은 5단계에 나오는 규칙의 모양입니다. `~/.cursor/rules/pstack-models.mdc`가 이미 있으면 읽어서 `# budget` 줄과 역할 값을 현재 선택으로 취급합니다. 없으면 기본값에서 시작합니다. 5단계에 없는 역할의 줄(예: `how critics`)은 폐지된 역할이므로 버립니다.
3. **예산, 매핑, 확인.**
   - (a) 예산을 묻습니다. 자유 입력보다 AskQuestion을 씁니다. 네 가지 선택지가 있고, 규칙에 현재 예산이 기록돼 있으면 그것을 알려 줍니다. 각각 모델의 추론 강도(effort)에 대응합니다.
   - (b) 예산을 적용합니다. 스킬의 기본값으로 작업 표를 만들고, 다시 실행하는 경우 계열, 목록, 별칭으로 바꿔 둔 역할은 유지합니다.
   - (c) 역할과 모델을 보여 주고 확인을 받습니다. 감지된 집합에 없는 실제 슬러그는 선택이 필요하다고 표시하고, 2단계에서 버린 줄도 알려 줍니다. 그대로 받을지, 특정 역할을 바꿀지 묻고, 선택지로 감지된 모델과 `inherit-parent`, `auto`를 제시합니다.
4. **검증.** 쓰는 모든 실제 슬러그는 감지된 집합에 있어야 합니다. `inherit-parent`와 `auto`는 항상 통과합니다. 고른 슬러그가 사용 불가면 멈추고 다시 묻습니다.
5. **규칙 쓰기.** `alwaysApply: true`, 선택한 라벨과 목표 강도를 담은 `# budget` 줄, 그리고 역할당 한 줄을 씁니다. 파일 전체를 덮어써서 다시 실행해도 결과가 같게 합니다.
6. **확인.** 규칙을 썼고 새 세션부터 적용된다고 알립니다. 스킬을 다시 실행하면 갱신됩니다.
7. **검증 스킬 제안(선택).** 프로젝트에 실제 앱을 구동해 증명하는 방법(`verify-*` 스킬이나 기존 하니스)이 있는지 확인합니다. 없으면 한 번만 제안합니다. 승낙하면 `/create-verification-skill`을 호출하고, 거절하면 더 권하지 않고 넘어갑니다.

#### 예산 선택지

예산은 `unlimited`, `large`, `medium`, `small` 네 가지입니다. `unlimited`는 표의 모든 강도를 그대로 둡니다. `large`, `medium`, `small`은 모든 실제 슬러그(패널 항목 포함)의 강도 토큰을 각각 `xhigh`, `high`, `medium`으로 바꿉니다. 강도 토큰은 마지막 토큰이거나, 끝에 `fast`가 붙으면 그 앞의 토큰이고, 사다리는 `max` > `xhigh` > `high` > `medium` > `low`입니다. 결과가 감지된 슬러그가 아니면 같은 계열의 감지된 슬러그 중 목표 이하에서 가장 높은 강도를 쓰고, 그것도 없으면 그 역할을 선택이 필요한 것으로 표시합니다. `inherit-parent`와 `auto`는 바뀌지 않습니다. 원문의 예로 `small`은 `claude-opus-5-5-max`를 `claude-opus-5-5-medium`으로, `grok-4.7-xhigh-fast`를 `grok-4.7-medium-fast`로 바꿉니다.

#### 규칙 파일의 모양

원문이 보여 주는 규칙 파일은 다음과 같습니다.

```text
---
description: pstack per-role model choices (overrides skill defaults)
alwaysApply: true
---
# pstack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` as a value: the role runs on the parent chat model (omit Task `model`). Alias entries in a panel list still count toward its fan-out.
# budget: unlimited (max)
feature, refactoring: grok-4.7-xhigh-fast
bug-fix: grok-4.7-xhigh-fast
perf-issue: grok-4.7-xhigh-fast
hillclimb: grok-4.7-xhigh-fast
judgment and prose: claude-opus-5-5-max
hardest tasks: claude-opus-5-5-max
how explorer: grok-4.7-xhigh-fast
how explainer: claude-opus-5-5-max
why investigators: grok-4.7-xhigh-fast
why synthesizer: claude-opus-5-5-max
reflect tooling: gpt-5.6-sol-max
reflect judgment, divergent, synthesizer: claude-opus-5-5-max
arena runners: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
arena cross-judge pool: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
swarm workers: grok-4.7-xhigh-fast
architect runners: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
interrogate reviewers: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
```

역할 이름을 성격별로 묶으면 다음과 같습니다.

| 역할 | 기본 모델 | 쓰는 곳 |
| --- | --- | --- |
| `feature, refactoring`, `bug-fix`, `perf-issue`, `hillclimb` | grok-4.7-xhigh-fast | 코드를 쓰는 위임 |
| `judgment and prose`, `hardest tasks` | claude-opus-5-5-max | 글쓰기, 판단, 가장 어려운 변경 |
| `how explorer`, `why investigators` | grok-4.7-xhigh-fast | 읽고 수집하는 역할 |
| `how explainer`, `why synthesizer` | claude-opus-5-5-max | 설명과 종합 |
| `reflect tooling` | gpt-5.6-sol-max | 도구 관점의 리뷰 |
| `reflect judgment, divergent, synthesizer` | claude-opus-5-5-max | 판단, 발산, 종합 |
| `arena runners`, `arena cross-judge pool`, `architect runners`, `interrogate reviewers` | 세 모델 패널 (opus, sol, grok) | 다중 모델 패널 |
| `swarm workers` | grok-4.7-xhigh-fast | `/swarm`의 기본 워커 |

패널 역할의 값은 쉼표로 이은 목록이고 항목마다 서브에이전트가 하나씩 뜹니다. `arena cross-judge pool`도 목록이지만, Arena가 그중 부모의 모델 계열과 가능하면 다른 값 하나를 골라 씁니다.

### 사용 예

```text
/setup-pstack
```

실행하면 스킬은 감지한 모델을 보여 주고 예산을 묻습니다. 예를 들어 `medium`을 고르면 모든 실제 슬러그의 강도가 `high`로 내려가고, 역할 표가 나옵니다. 특정 역할만 바꾸고 싶다면 그 역할을 지정하고, Auto를 계속 쓰려면 그 값을 `inherit-parent`나 `auto`로 정합니다. 규칙을 쓴 뒤 새 채팅에서부터 적용됩니다.

### 함정과 주의점

- 감지하지 못한 슬러그를 지어서 쓰지 않습니다. 감지가 실패하면 사용자에게 슬러그를 붙여 넣게 합니다.
- `auto`와 `inherit-parent`는 모델 슬러그가 아니라, 모델 필드를 생략해 부모 모델을 그대로 쓰겠다는 표시입니다. 패널 목록 안에 넣어도 패널의 팬아웃 수에는 포함됩니다.
- 5단계의 역할 이름과 다른 줄은 폐지된 역할로 보고 버립니다. 옛 규칙에서 다시 실행했는데 줄이 사라졌다면 그런 경우입니다.
- 규칙은 새 세션부터 적용됩니다.
- 0.15.3 이전에 만든 규칙은 옛 기본 모델을 고정합니다. 줄이나 파일을 지우고 다시 실행합니다.

### 관련 스킬

[`poteto-mode`](poteto-mode.md#skill-poteto-mode)가 이 규칙을 읽어 서브에이전트의 모델을 정합니다. 마지막 단계에서 [`create-verification-skill`](verification.md#skill-create-verification-skill)을 제안합니다.
