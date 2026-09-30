# Codyssey B1-1 · 자기소개 웹페이지

순수 HTML, CSS, JavaScript로 구현한 하동현의 반응형 포트폴리오 웹사이트입니다. 자기소개와 기술 스택을 제공하고, GitHub API로 공개 저장소 목록을 불러옵니다. 사용자 이벤트에 따라 상태를 변경하고 DOM을 갱신하는 흐름을 구현했습니다.

- **배포 사이트:** [자기소개 웹페이지](https://ehdgus6697-debug.github.io/mission-b1-1-portfolio/)
- **GitHub 저장소:** [mission-b1-1-portfolio](https://github.com/ehdgus6697-debug/mission-b1-1-portfolio)
- **사용 기술:** HTML5, CSS3, JavaScript ES6+, GitHub REST API, GitHub Pages
- **개발 환경:** VS Code, Live Server

## 프로젝트 구조와 파일 관계

```text
mission-b1-1-portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── images/profile.svg
├── docs/
│   ├── verification.md
│   └── screenshots/
│       ├── desktop.png
│       ├── mobile.png
│       └── dark.png
└── README.md
```

| 파일 | 역할 |
| --- | --- |
| [index.html](index.html) | Hero, About, Skills, Projects, Contact, Footer의 구조와 내용을 정의합니다. |
| [css/style.css](css/style.css) | 색상, 배치, 반응형 화면, 다크 모드, hover 효과와 애니메이션을 정의합니다. |
| [js/main.js](js/main.js) | DOM 선택, 이벤트 연결, 상태 관리, GitHub API 요청, 폼 검사를 담당합니다. |
| [images/profile.svg](images/profile.svg) | About 섹션의 프로필 이미지입니다. |
| [docs/verification.md](docs/verification.md) | 로컬 및 배포 사이트의 기능 검증 결과입니다. |
| docs/screenshots/ | 데스크톱·모바일·다크 모드 화면입니다. |

HTML에서 `link`로 CSS를, `script`의 `defer` 속성으로 JavaScript를 연결합니다. `defer`는 HTML 분석이 끝난 뒤 JavaScript를 실행하게 하므로 DOM 요소를 선택할 수 있습니다. 구조·표현·동작을 파일로 분리해 각 역할과 수정 위치를 구분했습니다.

## 주요 기능

| 기능 | 구현 내용 |
| --- | --- |
| 반응형 레이아웃 | 768px 미만은 모바일 배치, 768px 이상은 가로 메뉴와 자기소개 배치, 1024px 이상은 본문 최대 너비와 여백을 확장합니다. |
| 햄버거 메뉴 | 모바일에서 `☰ 메뉴` 버튼으로 메뉴를 열고 닫습니다. `STATE.menuOpen`에 따라 `active` 클래스를 토글하며, 메뉴 링크를 누르면 닫힙니다. |
| 다크 모드 | 버튼 클릭으로 테마를 전환하고 `localStorage`에 저장합니다. 새로고침 시 저장한 값을 읽어 복원합니다. |
| 부드러운 스크롤 | 섹션 앵커 링크와 CSS의 `scroll-behavior: smooth`를 사용합니다. |
| 스크롤 UI | 60px 이상에서 헤더 배경색을 변경하고, 300px 이상에서 맨 위로 이동하는 버튼을 표시합니다. |
| 스크롤 애니메이션 | Intersection Observer의 `threshold: 0.2`로 섹션 제목을 감지하고 `visible` 클래스를 추가합니다. |
| 프로젝트 목록 | GitHub API 데이터를 카드로 표시하며 로딩·성공·오류·빈 상태를 구분합니다. 오류 시 재시도 버튼을 제공합니다. |
| 문의 폼 | 이름·이메일·메시지의 필수값과 이메일 형식을 검사합니다. 입력 시 필드 아래에 오류를 표시하고, 유효한 제출에는 성공 안내를 표시합니다. |
| 시각 효과 | 버튼과 카드에 hover 및 transition을 적용하고, 카드에 box-shadow를 사용합니다. |

문의 폼은 유효성 검사와 성공 안내를 구현한 데모이며, 메시지를 실제로 전송하지 않습니다.

## HTML·CSS·JavaScript 설계

### 시맨틱 HTML

`header`는 머리말, `nav`는 이동 메뉴, `main`은 주요 내용, `section`은 주제별 구역, `article`은 독립적인 프로젝트 카드, `footer`는 저작권과 GitHub 링크에 사용했습니다. 요소의 의미와 내용의 역할을 기준으로 태그를 선택했습니다. 프로필 이미지에는 의미 있는 `alt`를 작성하고, 폼의 `label`과 입력 요소는 `for`·`id`로 연결했습니다.

### CSS 변수와 레이아웃

`:root`에 색상·글꼴·간격을 변수로 정의해 여러 요소가 같은 값을 공유하도록 했습니다. 공통 값을 한 곳에서 수정할 수 있고, `[data-theme="dark"]`에서 색상 변수를 덮어써 테마를 전환합니다.

네비게이션은 한 축의 정렬과 간격을 다루는 **Flexbox**를 사용했습니다. 프로젝트 목록은 행과 열에 카드를 배치하는 **Grid**를 사용했으며, `auto-fit`과 `minmax`로 공간에 맞게 열 수를 조절합니다.

**모바일 퍼스트**로 좁은 화면을 기본 스타일로 작성하고, `min-width: 768px`과 `min-width: 1024px`에서 배치를 확장했습니다. 좁은 화면에 필요한 구조부터 정하고, 공간이 늘어날 때 가로 배치와 여백을 추가하는 방식입니다.

### DOM과 이벤트

`querySelector`와 `querySelectorAll`로 요소를 선택하고, `addEventListener`로 `click`, `input`, `submit`, `scroll` 이벤트를 연결합니다. `textContent`, `innerHTML`, `classList.add/remove/toggle`을 사용해 내용을 갱신하거나 CSS 적용 조건을 변경합니다.

`onclick` 인라인 속성은 HTML 안에 동작을 작성하는 방식입니다. 이 프로젝트는 동작을 JavaScript 파일에서 관리하기 위해 `addEventListener`를 사용하며, 같은 요소의 같은 이벤트에 여러 함수를 연결할 수도 있습니다. 인라인 스타일과 `var`를 사용하지 않고, 변수는 `const`로 선언합니다.

## 이벤트 → 상태 변경 → 화면 업데이트

`STATE` 객체에 테마, 메뉴, 프로젝트 요청 상태, 폼 오류와 성공 여부를 모았습니다. 현재 상태를 한 곳에서 확인하고 렌더링 함수와 연결하기 위한 구조입니다. 개별 변수로도 구현할 수 있지만, 여기서는 기능별 상태를 묶어 관리했습니다.

| 기능 | 이벤트 또는 요청 | 상태 변경 | 화면 업데이트 |
| --- | --- | --- | --- |
| 다크 모드 | 테마 버튼 `click` | `STATE.theme` 전환 | `renderTheme()`이 HTML의 `data-theme`와 버튼 문구를 변경하고 CSS 변수가 적용됩니다. 선택한 값은 `localStorage`에 저장합니다. |
| 프로젝트 | 최초 로딩 또는 재시도 | `STATE.projects.status`를 loading → success / empty / error로 변경 | `renderProjects()`가 로딩 문구, 카드, 빈 목록 안내, 오류와 재시도 버튼을 표시합니다. |
| 문의 폼 | 입력 `input` 또는 제출 `submit` | `validateField()` 결과를 `STATE.form.errors`에 저장하고 제출 시 `success`를 결정 | `renderForm()`이 오류 문구, `aria-invalid`, 성공 안내를 갱신합니다. `preventDefault()`로 기본 폼 제출에 따른 페이지 이동을 막습니다. |

### GitHub API 처리와 배열 메서드

요청 주소는 `https://api.github.com/users/ehdgus6697-debug/repos?sort=updated&per_page=100`입니다. 최근 업데이트 순으로 최대 100개를 가져오며 포크한 저장소는 제외합니다.

1. `loadProjects()`에서 상태를 loading으로 설정하고 화면을 갱신합니다.
2. `try` 안에서 `await fetch()`로 응답을 기다립니다. HTTP 403·429는 요청 제한 또는 접근 제한 안내로 처리하고, 다른 실패 응답도 `response.ok` 검사 후 오류를 발생시킵니다.
3. `await response.json()`으로 데이터를 읽고 `filter()`로 포크를 제외합니다. 남은 목록이 있으면 success, 없으면 empty로 설정합니다.
4. 네트워크 실패나 발생시킨 오류는 `catch`에서 error 상태와 오류 메시지로 저장합니다.
5. `renderProjects()`를 호출해 최종 상태를 화면에 반영합니다. 성공 시 `map()`으로 각 저장소를 카드 HTML로 변환하고 `join('')`으로 합쳐 `innerHTML`에 넣습니다.

구조분해 할당으로 저장소의 이름·설명·주소·언어·별 수를 꺼내고, 화살표 함수와 템플릿 리터럴로 카드를 생성합니다. `forEach()`는 메뉴 링크와 입력 필드 등에 이벤트를 연결할 때 사용합니다. API의 문자열은 `escapeHTML()`로 변환해 HTML 태그로 실행되지 않고 텍스트로 표시되도록 처리합니다.

## 실행과 검증

배포 사이트는 별도 설치 없이 접속할 수 있습니다. 로컬에서는 VS Code로 프로젝트 폴더를 열고 Live Server 확장을 설치한 뒤, `index.html`에서 **Open with Live Server**를 선택합니다. 기본 로컬 주소는 `http://127.0.0.1:5500/`입니다.

GitHub Pages는 **main 브랜치의 루트 폴더**에서 배포합니다. main에 변경 사항을 올리면 사이트도 다시 배포됩니다.

2026-09-30 Chrome에서 로컬 및 배포 사이트의 기능 검증을 각각 13개 수행해 모두 통과했습니다. 320~1440px 반응형 배치, 테마 유지, 메뉴·스크롤, 폼 검사, API 상태 분기와 실제 API 카드 렌더링을 확인했으며 페이지 JavaScript 오류는 0건이었습니다. 오류·빈 상태 등은 테스트 응답으로 재현했고, 실제 GitHub API 응답과 CSS·JavaScript·이미지의 정상 응답도 확인했습니다. 상세 내용은 [검증 기록](docs/verification.md)에 있습니다.

## 스크린샷

아래 이미지는 로컬 실행 환경에서 실제 GitHub API 응답으로 촬영한 화면입니다.

### 데스크톱

![데스크톱 화면](docs/screenshots/desktop.png)

### 모바일

![모바일 화면](docs/screenshots/mobile.png)

### 다크 모드

![다크 모드 화면](docs/screenshots/dark.png)
