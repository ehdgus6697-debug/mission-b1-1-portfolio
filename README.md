# 하동현 자기소개 · Codyssey B1-1

HTML, CSS, JavaScript의 구조와 동작을 공부하기 위한 기본 웹페이지다. 필수 요구사항과 평가문항에 필요한 기능을 포함하고, 보너스는 제외했다. 외부 라이브러리를 사용하지 않는다.

## 실행

VS Code에서 이 폴더를 열고 `index.html` 우클릭 → **Open with Live Server**를 선택한다. Live Server 설치 및 포트 5500 설정은 준비되어 있다.

- 로컬 주소: `http://127.0.0.1:5500`
- GitHub API 계정: `ehdgus6697-debug`
- 저장소 URL: [ehdgus6697-debug/mission-b1-1-portfolio](https://github.com/ehdgus6697-debug/mission-b1-1-portfolio) · 비공개
- GitHub Pages URL: 아직 미배포

## 공부할 파일과 순서

1. `index.html`: header, nav, main, section, article, footer로 내용의 구조를 만든다. 프로필 이미지는 `images/profile.svg`를 사용한다.
2. `css/style.css`: 기본 모바일 화면 → Flexbox와 Grid → 768px/1024px 화면 순서로 읽는다.
3. `js/main.js`: STATE와 DOM 선택부터 시작해 테마, 메뉴, 스크롤, API, 폼 순서로 읽는다.

HTML은 구조, CSS는 표현, JavaScript는 동작을 담당한다. 파일을 나누면 역할을 구분하고 수정할 위치를 찾기 쉽다. CSS는 link로, JS는 script의 defer로 연결한다. defer는 HTML 분석 후 DOM이 준비되면 JS를 실행하게 한다.

## 평가문항 핵심 설명

| 개념 | 이 코드에서의 사용과 이유 |
| --- | --- |
| 시맨틱 태그 | header는 머리말, nav는 이동 메뉴, main은 주요 내용, section은 주제 구역, article은 독립적인 프로젝트 카드, footer는 저작권·소셜 링크다. 의미에 맞게 선택했다. |
| CSS 변수 | `:root`에 색상·글꼴·간격을 정의하고, `[data-theme="dark"]`에서 색을 덮어쓴다. 여러 요소의 값을 한 곳에서 바꿀 수 있다. |
| Flexbox / Grid | nav는 한 줄의 정렬이므로 Flexbox, 프로젝트는 행과 열에 카드를 배치하므로 Grid를 쓴다. Grid는 auto-fit과 minmax로 열 수를 조절한다. |
| 모바일 퍼스트 | 좁은 화면을 기본으로 만들고, 공간이 생기는 768px·1024px에서 메뉴와 본문 배치를 확장한다. |
| DOM 선택 | `querySelector`는 요소 하나, `querySelectorAll`은 요소 목록을 찾는다. |
| addEventListener | HTML의 onclick에 행동을 섞지 않고 JS에서 이벤트를 연결한다. 같은 이벤트에 여러 처리 함수를 연결할 수도 있다. |
| STATE 객체 | 관련 상태를 한 곳에 모아 현재 값을 찾고 화면과 연결하기 쉽다. 개별 변수로도 구현할 수 있지만 이 과제에서는 흐름을 드러내기 위해 객체를 쓴다. |
| 화살표 함수 | 이벤트·배열 처리 함수를 표현한다. |
| 구조분해 | `const { status, data, error } = STATE.projects`처럼 필요한 속성을 꺼낸다. |
| filter / map / forEach | filter로 포크를 제외 → map으로 카드 문자열 생성 → join으로 합친다. forEach는 각 링크·입력칸에 이벤트를 연결할 때 쓴다. |

### 이벤트 → 상태 변경 → 화면 업데이트: 세 가지

- **테마:** 버튼 click → `STATE.theme` 변경 → `renderTheme()`이 data-theme와 버튼 글자를 변경 → CSS 변수 적용. localStorage에 저장해 새로고침 후 복원한다.
- **API:** `loadProjects()` → status를 loading으로 변경하고 렌더링 → await fetch → 응답 검사 → JSON 데이터 읽기 → success/empty 또는 catch의 error → `renderProjects()`가 화면 변경. HTTP 403 등은 fetch가 자동으로 예외를 던지지 않으므로 response.ok를 확인하고 직접 throw한다.
- **폼:** input → `validateField()` → `STATE.form.errors` 변경 → `renderForm()`이 필드 아래 오류를 표시. submit에서는 preventDefault로 페이지 이동을 막고 전체 검사 후 success와 성공 안내를 갱신한다.

`escapeHTML()`은 API의 설명 등이 HTML 태그로 실행되지 않고 글자로 표시되도록 변환한다. innerHTML로 외부 데이터를 넣으므로 필요한 처리다.

## 기능 확인

- 화면 축소: 모바일 메뉴 숨김/햄버거 표시, 768px부터 가로 메뉴
- 햄버거 클릭: active 클래스 토글로 열기/닫기
- 링크 클릭: CSS smooth scroll로 이동, 모바일 메뉴 닫기
- 스크롤: **60px**부터 헤더 배경 변경, **300px**부터 맨 위 버튼 표시
- 애니메이션: Intersection Observer **threshold 0.2**, 제목이 보이면 표시
- 버튼·카드: hover, transition, 프로젝트 카드 box-shadow
- API: 로딩/성공/오류/빈 상태, 오류 재시도, 403/429 요청 제한 안내
- 폼: 이름·이메일·메시지 필수, 공백 검사, 이메일 형식 검사, 입력 즉시 피드백, 성공 안내

API는 `/users/ehdgus6697-debug/repos?sort=updated&per_page=100`에서 최근 업데이트 순으로 최대 100개를 읽고 포크를 제외한다. 언어별 필터 UI·타이핑·실제 메일 전송·시스템 테마 감지는 구현하지 않았다. 메시지는 실제로 전송되지 않는다.

## 배포와 제출

공개 승인 후 저장소를 공개로 전환하고, GitHub Settings → Pages에서 **main / (root)** 를 선택한다. 실제 저장소·배포 URL을 위에 기록하고 배포 화면에서 기능을 확인한다. 제출물은 저장소 URL, 배포 URL, 아래 스크린샷 3종이다. 인증 없는 API 요청은 과제 안내 기준 시간당 60회 제한이 있어 반복 새로고침을 피한다.

## 스크린샷

로컬 실행 화면이다. [검증 기록](docs/verification.md).

![데스크톱](docs/screenshots/desktop.png)
![모바일](docs/screenshots/mobile.png)
![다크 모드](docs/screenshots/dark.png)
