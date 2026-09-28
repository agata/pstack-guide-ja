# 용어집

이 책이 쓰는 용어의 표기를 정합니다. 집필할 때 이 표를 기준으로 삼았고, 앞으로 원고를 더할 때도 같은 표기를 씁니다. 영어 용어는 본문에 처음 나올 때 한국어 풀이를 붙이고, 그 뒤로는 아래 표기를 씁니다. 스킬 이름, 명령어, 파일 이름, 식별자는 번역하지 않고 원문 그대로 씁니다.

## pstack의 구성 개념

| 영어 | 이 책의 표기 | 설명 |
| --- | --- | --- |
| skill | 스킬 | `SKILL.md`를 가진 디렉터리 하나. 에이전트가 따르는 워크플로 문서 |
| plugin | 플러그인 | 스킬, 에이전트를 묶어 설치하는 단위. pstack은 `/add-plugin pstack`으로 설치 |
| playbook | 플레이북 | `poteto-mode`가 작업 유형별로 고르는 절차서. 23개 |
| principle | 원칙 | `principle-*` 스킬 하나가 담은 규칙 하나. 23개 |
| mode / sticky mode | 모드 / 스티키 모드 | 한 번 켜면 여러 턴 동안 유지되는 스킬(`poteto-mode`) |
| agent / subagent | 에이전트 / 서브에이전트 | 작업하는 모델 인스턴스 / 부모가 띄워 일을 맡기는 에이전트 |
| harness | 하니스 | 앱을 구동하고 검사하는 테스트 도구. 에이전트를 감싸 실행하는 도구를 가리킬 때도 씀 |
| role | 역할 | 자기 모델 선택을 가진 위임 작업 단위(`arena runners` 등) |
| panel | 패널 | 다중 모델 스킬이 쓰는 서로 다른 모델의 묶음. 기본은 opus, sol, grok |
| model slug | 모델 슬러그 | 모델을 가리키는 식별 문자열(`claude-opus-5-5-max` 등) |
| reasoning budget / effort | 추론 예산 / 추론 강도 | `/setup-pstack`이 정하는 unlimited, large, medium, small과 모델 이름의 `max`, `xhigh` 같은 등급 |
| rule file | 규칙 파일 | `~/.cursor/rules/pstack-models.mdc`. 역할별 모델을 정하는 항상 적용 규칙 |
| inherit-parent / auto | inherit-parent / auto | 모델 필드를 생략해 서브에이전트가 부모 모델을 쓰게 하는 별칭 |
| control skill | control 스킬 | UI, CLI를 구동해 증명하는 스킬. cursor-team-kit의 `control-cli`, `control-ui` |
| cursor-team-kit | cursor-team-kit | pstack과 별개인 Cursor 플러그인. `deslop` 등이 여기 있음 |
| automation | 자동화 | 외부 신호(슬랙 제보 등)에 반응해 도는 Cursor 자동화. `automations/benny` |

## 작업 흐름 개념

| 영어 | 이 책의 표기 | 설명 |
| --- | --- | --- |
| fan-out | 팬아웃 | 작업을 서브에이전트 여러 개로 나눠 병렬로 돌림 |
| worker | 작업자 | `swarm`이나 팬아웃에서 조각을 맡는 서브에이전트 |
| runner | 러너 | `arena`, `architect`에서 후보를 만드는 서브에이전트 |
| explorer / explainer | 탐색자 / 설명자 | `how`의 서브에이전트. 사실을 모으는 쪽 / 설명을 쓰는 쪽 |
| investigator / synthesizer | 조사자 / 종합자 | `why`, `reflect`의 서브에이전트. 증거를 모으는 쪽 / 종합하는 쪽 |
| reviewer / judge | 리뷰어 / 심사자 | `interrogate`의 리뷰어. `arena`의 교차 심사자 |
| cross-judge | 교차 심사 | 후보와 다른 모델 계열의 심사자가 루브릭으로 채점 |
| rubric | 루브릭 | 채점 기준 3~6개 |
| candidate / base / graft | 후보 / 기준안 / 이식 | `arena`에서 후보를 만들고, 하나를 기준으로 고르고, 나머지의 좋은 부분을 옮겨 붙임 |
| race | 경주 | 같은 지시로 작업자 여럿을 돌리고 선언한 규칙(first pass, rank all, best-of)으로 고름 |
| slice | 조각 | `swarm`이 나누는 독립된 작업 단위 |
| worktree | 워크트리 | 같은 저장소의 브랜치를 별도 디렉터리로 체크아웃한 것. 병렬 작업의 격리 단위 |
| stack | 스택 | 부모 브랜치를 베이스로 하는 PR의 사슬. 루트 PR만 트렁크를 대상으로 함 |
| trunk | 트렁크 | 기본 브랜치(main) |
| merge frontier | 병합 프런티어 | 스택에서 가장 낮은 미병합 PR |
| merge-ready | 병합 준비 | 포지가 PR을 병합할 수 있다고 동의하는 상태 |
| babysit | babysit | PR을 병합 준비까지 끌고 가는 일. 플레이북 이름이라 영어 그대로 |
| forge | 포지 | PR을 다루는 서비스나 도구(GitHub의 `gh`, `origin` 등) |
| verdict | 판정 | 검증자나 리뷰어가 내린 결과(`PASS`, `PASS+NOTES`, `FAIL` 등) |
| patch-id | patch-id | `git patch-id`. 패치 내용의 안정적인 식별자. 리베이스로 SHA가 바뀌어도 같은 값 |
| todo list | 할 일 목록 | 플레이북 단계를 그대로 복사해 여는 에이전트의 작업 목록 |
| throughput checkpoint | 처리량 점검표 | Feature 플레이북 3단계의 네 항목(blocking first steps 등) |
| decision trail / log | 결정 기록 | `show-me-your-work`가 남기는 TSV |
| operator | 운영자 | 자율 플레이북을 부리는 사람 |
| coordinator | 조정자 | Orchestrate에서 브리프를 쓰고 대기열을 비우는 채팅 |
| brief | 브리프 | 에이전트에게 주는 프롬프트. GOAL, SCOPE 등 필드가 있음 |
| ledger | 장부 | Orchestrate의 검증 판정 기록(`ledger.tsv`) |
| gate | 관문 | 사람의 결정이 필요한 지점이거나 검증을 통과해야 나아가는 조건 |

## 품질과 검증 개념

| 영어 | 이 책의 표기 | 설명 |
| --- | --- | --- |
| slop | 슬롭 | AI가 양산한 조잡한 코드나 글 |
| verification / proof | 검증 / 증명 | 실제 산출물에서 확인하는 것. "컴파일된다"는 아님 |
| evidence | 증거 | 결과를 뒷받침하는 파일, 로그, 스크린숏, SHA 같은 포인터 |
| feature map | 기능 지도 | 검증 스킬이 사용자 관점으로 유지하는 기능 목록 |
| repro | 재현 | 결함을 실제로 다시 일으키는 것 |
| root cause | 근본 원인 | 증상이 아니라 그 뒤의 원인 |
| regression | 회귀 | 전에 되던 동작이 깨지는 것 |
| drift | 표류 | 문서나 지도가 실제와 어긋나는 것 |
| blast radius | 파급 범위 | 변경이 다른 곳에서 깨뜨릴 수 있는 범위 |
| characterization test | 특성화 테스트 | 현재 동작을 그대로 고정하는 테스트 |
| baseline | 기준선 | 변경 전의 측정값이나 스크린숏 |
| flake | 불안정(flake) | 코드와 무관하게 간헐적으로 실패하는 검사 |
| stale base | 낡은 베이스 | 트렁크가 앞서 갔는데 리베이스하지 않은 브랜치 |
| suppression | 억제 | `eslint-disable`, `@ts-ignore` 같은 검사 무력화 |
| bugbot | Bugbot | Cursor의 PR 리뷰 자동화. 영어 그대로 |
| hedge | 헤지 | "~로 보인다"처럼 확신을 낮추는 표현 |
| tier(evidence) | 신뢰도 등급 | `why`의 Direct, Supported, Inferred, Speculative, Unknown |
| fail closed | 안전하게 실패 | 불확실하면 동작하지 않고 멈춤 |

## 설계 개념

| 영어 | 이 책의 표기 | 설명 |
| --- | --- | --- |
| module depth / shallow module | 모듈 깊이 / 얕은 모듈 | 공개 표면 대비 숨긴 복잡도. 얕은 모듈은 큰 인터페이스에 숨기는 것이 적음 |
| information leakage | 정보 누수 | 여러 모듈이 같은 내부 결정에 의존함 |
| temporal decomposition | 시간적 분해 | 소유한 지식이 아니라 실행 순서로 모듈을 나눔 |
| pass-through method | 통과 메서드 | 같은 인자를 그대로 넘기기만 하는 메서드 |
| discriminated union | 판별 유니온 | 리터럴 판별자로 변형을 모델링한 합 타입 |
| branded type | 브랜드 타입 | 같은 원시 타입이 섞이지 않게 표지를 붙인 타입 |
| exhaustive matching | 완전한 매칭 | 새 변형이 추가되면 컴파일러가 실패하게 하는 매칭 |
| idempotent | 멱등 | 몇 번 돌려도 같은 끝 상태로 수렴함 |
| boundary | 경계 | 데이터가 시스템으로 들어오는 곳. 검증은 여기에 둠 |
| scaffold | 뼈대 | 이후 모든 단계에 도움이 되는 기반(CI, 린트, 테스트 인프라) |
| lever | 지렛대 | 작업을 하거나 증명하는 스크립트, 코드모드 같은 도구 |
| census | 센서스 | 행위자마다 불균형을 세는 스크립트(`attack-the-premise`) |
| premise | 전제 | 실패한 수정들이 모두 가정한 한 문장(`attack-the-premise`) |
| artifact | 산출물 | 단계가 만들어 내는 파일, 로그, 커밋, 보고 |
| flow chart | 흐름도 | 플레이북의 단계, 분기, 중단 조건을 그린 그림 |
| worked example | 예시 | 이 책의 저자가 만든 요청과 전후 코드나 대화. 원본에 없다는 표시가 붙음 |
| code judo | code judo | 동작을 보존하면서 구현을 극적으로 단순하게 만드는 재구성. 원문 표현 |
