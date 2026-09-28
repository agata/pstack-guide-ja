# 진행 상황

재시작해도 이어서 작업할 수 있도록 남기는 파일입니다. 원본은 `SOURCE.md`, 문체와 절 구성은 `STYLE.md`, 용어는 `manuscript/92-app-glossary.md`를 봅니다.

## 원본

`cursor/plugins`의 `pstack/`, 커밋 `adf3218ca2f5b9971eedc07a76bef22df7701539` (0.15.5) 한 가지입니다. 다른 판이나 포팅 자료는 쓰지 않았습니다. 자세한 내용은 `SOURCE.md`.

## 빌드와 검사

```shell
bun install
bun tools/build.mjs        # dist/pstack-guide-<버전>.epub, dist/pstack-guide-<버전>.pdf
PSTACK_SRC=<클론 경로>/pstack bun tools/check.mjs   # 원고 규칙, 링크, 스킬 47개와 플레이북 23개의 절 존재, epubcheck
bun tools/check-layout.mjs                          # EPUB을 390px 폭에서 열어 가로 넘침 검사
bun tools/pdf-inspect.mjs dist/pstack-guide-<버전>.pdf <출력 디렉터리> 2,10,300   # PDF 페이지 수, 개요, 글꼴, 한글 텍스트, 선택한 페이지를 PNG로
```

## 장 목록

상태: todo, drafted (초고), checked (원문 대조 완료).

| 파일 | 내용 | 상태 |
| --- | --- | --- |
| 01-front-colophon | 이 책에 대하여, 기준 버전 | | checked |
| 02-front-howto | 이 책을 읽는 방법 | | checked |
| 10-part-start | 1부 시작하기 | | checked |
| 11-ch-what-is-pstack | pstack이란 무엇인가 (README, 매니페스트, 구성) | | checked |
| 12-ch-setup | 설치와 첫 사용 (`setup-pstack`) | | checked |
| 20-part-entry | 2부 진입점 | | checked |
| 21-ch-poteto-mode | `poteto-mode` 본체와 `poteto-agent` | | checked |
| 22-ch-playbooks-work | 작업 플레이북 12개 (조사, 버그, 성능, 기능 등) | | checked |
| 23-ch-playbooks-pr | PR 플레이북 (opening-a-pr, babysit, shipping, bugbot-triage) | | checked |
| 24-ch-playbooks-long | 장시간, 대규모 플레이북 8개 | | checked |
| 30-part-understand | 3부 이해하기 | | checked |
| 31-ch-how | `how` | | checked |
| 32-ch-why | `why` | | checked |
| 33-ch-teach-recall | `teach`, `recall` | | checked |
| 40-part-design | 4부 설계하기 | | checked |
| 41-ch-architect | `architect` | | checked |
| 42-ch-arena-swarm | `arena`, `swarm`, `figure-it-out` | | checked |
| 43-ch-principles | `principle-*` 23개 | | checked |
| 50-part-fix | 5부 고치고 검증하기 | | checked |
| 51-ch-tdd-blast | `tdd`, `blast-radius` | | checked |
| 52-ch-interrogate | `interrogate` | | checked |
| 53-ch-verification | `create-verification-skill`, `maintain-verification-skill` | | checked |
| 60-part-clean | 6부 글과 코드 정리 | | checked |
| 61-ch-writing | `unslop`, `technical-writing` | | checked |
| 62-ch-code-hygiene | `no-comments`, `typescript-best-practices` | | checked |
| 70-part-yours | 7부 나만의 방식과 유틸리티 | | checked |
| 71-ch-personal | `automate-me`, `reflect`, `show-me-your-work` | | checked |
| 72-ch-utility | `bro` | | checked |
| 80-part-automation | 8부 자동화 | | checked |
| 81-ch-benny | `make-bot-ui`, `automations/benny` | | checked |
| 85-part-practice | 9부 실전 | | checked |
| 86-ch-overnight | 밤새 돌리기 | | checked |
| 87-ch-recipes | 레시피와 함정 | | checked |
| 91-app-quickref | 부록 A 스킬 빠른 참조표 | | checked |
| 92-app-glossary | 부록 B 용어집 | | checked |
| 93-app-decision-flow | 부록 C 스킬 선택 흐름도 | | checked |
| 94-app-attribution | 부록 D 저작권 표기 | | checked |

## 구성 변경과 이유

- 원본의 `docs/guide`는 10장짜리 사용 안내서입니다. 이 책은 스킬을 주제별로 묶는 구성을 유지하되, 가이드의 흐름(설정, 라우팅, 이해, 설계, 빌드와 정리, 검증과 배포, 밤새 돌리기, 원칙, 나만의 방식, 레시피)을 각 부에 나눠 담았습니다.
- `poteto-mode`는 SKILL.md와 플레이북 23개, references, scripts로 분량이 가장 큽니다. 다른 부의 항목으로 두면 균형이 무너져서 시작하기 다음에 독립된 부(진입점)로 세웠습니다.
- `setup-pstack`은 설치와 설정이 주제라서 시작하기 부의 설치 장에서 스킬 절로 다룹니다.
- `principle-*` 스킬은 독립된 장(설계하기 부)으로 묶었습니다.
- 검증 스킬(`create-verification-skill`, `maintain-verification-skill`)은 버그 수정과 검증이 같은 흐름이라서 고치고 검증하기 부의 마지막 장에 뒀습니다.
- cursor-team-kit의 스킬은 장으로 쓰지 않았습니다. 이 저장소의 pstack 파일이 그것을 부르는 자리에서 한두 문장으로만 언급합니다. 그래서 fix-ci, fix-merge-conflicts, PR 준비 스킬 장은 없고, PR 흐름은 poteto-mode 플레이북 장에서 다룹니다.
- 원본의 `automations/benny`는 슬래시 스킬로 등록되지 않은 자동화 팩이라 별도 부(자동화)로 뒀습니다.

## 해석한 부분 (원문이 모호했던 곳)

- **원문 개수.** principle 스킬은 23개입니다(스킬 총 47개 = 일반 24개 + principle 23개). README도 23개라고 합니다. 책은 고정한 커밋의 디렉터리를 세어 얻은 수를 따릅니다.
- **Comment Sicko의 읽기 전용 여부.** README와 안내서는 "read-only comment reviewer"라고 하지만 `agents/comment-sicko.md`는 스스로 주석을 지우고 삭제 수를 보고한다고 씁니다("I touch comments", "touched files, deletion count"). 애플리케이션 코드는 쓰지 않는다는 점은 일치합니다. 책은 정의 파일의 표현을 따르고 README의 표현을 함께 밝혔습니다.
- **`/setup-pstack` 재실행의 보존 범위.** README와 안내서는 "기본값과 다른 역할을 유지"라고 하고, `setup-pstack/SKILL.md` 3(b)는 계열, 목록, 별칭으로 바꾼 역할을 유지하고 강도 토큰은 새 예산에 맞춰 다시 계산한다고 합니다. 책은 정밀한 쪽(스킬 본문)을 따릅니다.
- **`poteto-mode`의 프런트매터 해석.** `mode: true`, `disable-model-invocation: true`, `reminder`는 원문에 뜻이 풀이되어 있지 않습니다. README의 "sticky mode" 설명과 `reminder` 문구에서 읽은 대로 옮겼고, `disable-model-invocation`은 "모델이 자동으로 부르지 않는다"는 통상 뜻으로 적었습니다.
- **`benny`가 슬래시 스킬이 아니라는 점.** README가 "dormant", "not registered as slash skills"라고 밝힙니다. 책은 별도 부(자동화)에서 지시문의 내용을 원문 순서대로 옮겼습니다.
- **`cursor-team-kit`.** 별개 플러그인이라 장으로 다루지 않았습니다. `poteto-mode`와 플레이북이 부르는 자리(`deslop`, `control-cli`, `control-ui`, `create-skill` 내장 기능 등)에서 출처만 밝혔습니다.
- **Claude Code 포팅.** 저장소 원본에는 나오지 않는 외부 정보라서 저작권 표기 부록에서 존재만 언급하고 원본에서 확인하지 않았다고 밝혔습니다.
- **`disable-model-invocation`.** `setup-pstack`만 이 프런트매터가 없고 나머지 46개 스킬에는 모두 있습니다. 스킬 절에서는 있는 경우에 한해 언급했습니다.

## 열린 질문

- 없음.

## 사실 확인 기록

2026-09-28에 고정한 클론(`adf3218`)에서 스킬 47개, 플레이북 23개, 에이전트 2개, 자동화 팩, 안내서 10장을 원고와 대조했습니다.

- `bun tools/check.mjs`가 스킬 47개와 플레이북 23개마다 원고에 절이 있는지, `{{src:...}}` 링크가 가리키는 파일이 클론에 있는지, 내부 링크가 풀리는지 기계로 검사합니다.
- 전체 원고를 다섯 묶음으로 나눠 읽기 전용 AI 보조 에이전트 다섯 개가 원문을 다시 열어 대조했습니다. 묶음: (1) 시작하기와 poteto-mode와 작업 플레이북, (2) PR 플레이북과 장시간 플레이북과 스크립트, (3) how, why, teach, recall, architect, arena, swarm, figure-it-out, (4) 원칙 23개와 tdd, blast-radius, interrogate, 검증 스킬, unslop, technical-writing, no-comments, typescript-best-practices, (5) automate-me, reflect, show-me-your-work, bro, make-bot-ui, benny, 밤새 돌리기, 레시피, 부록.
- 보조 에이전트의 지적은 하나씩 원문에서 다시 확인한 뒤 고쳤습니다. 고친 것: 서브에이전트 모델 기본값에서 지어낸 "나머지는 단일 역할 기본값" 삭제, 역할별 줄의 우선순위와 `inherit-parent` 규칙 보강, 전면 자율 부여 규칙과 Babysit 모드 선언과 Shipping 병합 예약 규칙 추가, Feature의 "예외 없음" 과장 교정, `orch`와 `how`/`why`/`recall`이 원칙을 구현한다는 근거 없는 서술 삭제, 원칙 인용처 교정(guard-the-context-window, fix-root-causes), interrogate 코드 품질 렌즈가 0번부터 7번까지 여덟 개라는 점과 1번의 면제 조항, `maintain-verification-skill`의 `blocked` 조건 교정, reflect 기준 수 8개 교정, `watch-pr`의 READY 근거를 원문 문장으로 교정, `bugbotReviewPasses`가 PR 전체 값이라는 점, Bugbot 후보 학습이 네 가지라는 점, `inbox drain`이 4행 제한 밖이라는 점, teach의 문체 규칙과 예시 출처 교정, `Comment Sicko`의 읽기 전용 표현 정리, benny 관련 스킬 링크 문장 교정과 누락 규칙 보강, 저자 이름 표현 교정.
- 지적했지만 고치지 않은 것: 없음(전부 반영).

## 원칙과 플레이북 심화

처음 원고를 마친 뒤 원칙 장(`43-ch-principles`)과 플레이북 세 장(`22`, `23`, `24`)을 깊게 다뤘습니다. 다른 장은 다시 쓰지 않았고, 이 변경 때문에 바뀐 앞부분(`01`, `02`), 부록(`91`, `92`), README만 손봤습니다.

추가한 것:

- 원칙 23개 절마다 적용과 예외, 저자가 만든 전후 예시 하나, 함정, 함께 보는 원칙(원문이 서로 연결한 것만). 장 끝에 "원칙이 서로 당길 때" 절(원문이 밝힌 짝의 표와 해설 블록).
- 플레이북 23개 절마다 흐름도, 단계별 산출물, 저자가 만든 예시, 실패와 중단과 모호할 때, 호출하는 스킬과 스크립트 표.
- 흐름도는 마크다운의 ` ```flow ` 블록에서 빌드가 인라인 SVG로 그립니다(`tools/lib/flow.mjs`). 문법은 그 파일의 머리말에 있습니다.
- 표시 규칙: 저자가 만든 예시는 점선 테두리 인용 블록이고 첫 줄이 "예시 (이 책의 저자가 만든 것, 원본에 없음)"입니다. 원문에 없는 해석은 "해설 (이 책의 해석, 원본에 없음)"입니다. `tools/check.mjs`가 이 두 표지의 문구가 정확한지 검사합니다.

쪽수: 334쪽에서 419쪽으로 85쪽 늘었습니다(원칙 장 약 19쪽, 플레이북 세 장 약 65쪽). 흐름도는 상자 제목만 남겨 크기를 줄였고 표의 여백을 줄였으며 사소한 항목을 잘랐습니다.

### 해석한 부분 (심화)

- 흐름도의 `back` 화살표는 원문이 반복을 말하는 자리에만 그렸습니다(Hillclimb의 가설 루프, Visual parity의 diff 0 루프, Shipping의 병합 후 재계산, Orchestrate의 웨이브, Autopilot-full의 다음 항목, Autopilot-stack의 재검증 등). 화살표의 도착 단계는 원문의 서술에서 읽은 것입니다.
- Opening a PR은 원문에 번호 단계가 없어서 굵은 소제목 아홉 개의 순서를 흐름으로 그렸습니다.
- 원문이 정하지 않은 항목(예: 신호가 잡히지 않는 경우)은 "원문이 정하지 않았다"고 쓰거나 아예 넣지 않았습니다.
- 원칙 절의 "함께 보는 원칙"은 원문의 다른 파일이 그 원칙을 실제로 이름으로 부르는 경우만 적었습니다. 그렇지 않은 연결은 "해설" 표지를 붙였습니다.

### 사실 확인 기록 (심화)

2026-09-28에 고정한 클론(`adf3218`)에서 바뀐 절 전부를 다시 대조했습니다. 읽기 전용 AI 보조 에이전트 네 개가 원문을 다시 열어 대조했습니다. 묶음: (1) 작업 플레이북 12개, (2) Opening a PR, Babysit, Shipping, Autonomous run, Session pickup, Pause safely, Worktree cleanup, (3) Multi-phase plan, Orchestrate, Autopilot-full, Autopilot-stack, (4) 원칙 23개와 상호작용 절. 예시 블록은 이야기 자체를 대조하지 않고 플레이북 규칙과 어긋나는지만 봤습니다. 지적은 하나씩 원문에서 다시 확인한 뒤 고쳤습니다.

고친 것:

- Shipping 흐름에서 감시(8단계)가 재계산(7단계)보다 먼저 오도록 순서 교정, Babysit 호출 표에서 근거 없는 Opening a PR 행 삭제.
- Bug fix 표에 `/loop` 추가, Perf issue의 control 스킬 단계 교정, Runtime forensics 예시에 처리량 점검표 추가, Refactoring 표에 control 스킬 추가와 4단계 산출물 교정, Authoring의 "문체" 표현 삭제, Eval 예시를 모델마다 두 변형을 돌리도록 수정.
- Orchestrate: `orch` 하위 명령을 단계별로 정확히 나눔, 2단계 산출물 교정, 웨이브 루프 도착 단계 교정. Autopilot-full: 예시의 무조건적 "진술 후 대기" 삭제, 루프를 소유자의 병합 단계로 이동. Autopilot-stack: 재검증 루프 추가. `/goal`을 내장 명령이라고 부른 표현 교정.
- 원칙: 원문이 서로 연결하지 않은 원칙 연결(foundational-thinking과 separate-before-serializing, experience-first와 exhaust-the-design-space, model-the-domain과 type-system-discipline 등)을 삭제하거나 "해설"로 표시, 근거 없는 서술("판정 기준은 줄 수가 아니라")을 원문 표현으로 교정, benny `setup-benny` 서술 교정, Feature의 워크트리 서술 교정, Autonomy와 never-block-on-the-human의 연결을 해설로 표시하고 상호작용 표에서 그 행 삭제, fix-root-causes 예시 코드의 순서 오류 교정, 상호작용 해설의 "앞의 원칙이 이깁니다"를 "뒤의 원칙"으로 교정, 라벨만 있고 본문이 없던 "해설" 표시 정리.
- 용어 통일: 원장을 장부로, 드리프트를 표류로, 게이트를 관문으로, 레버를 지렛대로, 서브코디네이터를 하위 조정자로.

지적했지만 고치지 않은 것: Hillclimb와 Visual parity의 `back` 화살표 도착 단계(원문 서술에서 읽은 대로 의도한 것이라 유지).

### 산출물

- `dist/pstack-guide-<버전>.epub` (EPUB 3, epubcheck-ts 오류 0, 경고 0, 390px 폭 가로 넘침 없음, 흐름도는 인라인 SVG)
- `dist/pstack-guide-<버전>.pdf` (가로 152mm, 세로 225mm, 419쪽, 개요 560항목, 한글 텍스트 추출 확인, em dash 0)
- 저장소에는 넣지 않고 저장소 밖 릴리스 폴더에 SHA256SUMS와 함께 둡니다.

버전: 이 책의 버전은 기준으로 삼은 pstack의 버전(0.15.5)과 같습니다. 값은 `tools/lib/manuscript.mjs`의 `SOURCE.version` 한 곳에만 적고, 표지와 서지 정보, EPUB 메타데이터, 산출물 파일 이름이 이 값을 읽습니다. `tools/check.mjs`가 어긋남을 검사합니다.
