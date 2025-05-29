# Frontend (React)

이 디렉토리는 사용자 인터페이스(UI)를 담당하는 **프론트엔드 애플리케이션**입니다.  
React 기반으로 개발되었으며, REST API를 통해 백엔드와 통신합니다.

## 🌐 주요 기능

- 사용자 인증 (로그인/회원가입)
- 프로젝트/서비스 대시보드
- 시각화 컴포넌트 (차트, 노드 기반 UI 등)
- 반응형 인터페이스

## ⚙️ 기술 스택

- React + Vite
- useContext 상태 관리
- TailwindCSS
- Axios

## 📁 폴더 구조

```bash
📦 frontend/
 ┣ 📂 docs/                     # 화면 설계 문서, 컨벤션 등
 ┃ ┣ 📜 Code-Convention.md
 ┃ ┣ 📜 Commit-Message-Convention.md
 ┃ ┗ 📜 Issue-Convention.md
 ┣ 📂 src/
 ┃ ┣ 📂 src/
 ┃ ┃ ┣ 📂 api/                 # API 호출 관련 함수
 ┃ ┃ ┣ 📂 components/          # 재사용 가능한 컴포넌트
 ┃ ┃ ┣ 📂 contexts/            # 전역 상태 관리 컨텍스트
 ┃ ┃ ┣ 📂 pages/               # 페이지 컴포넌트
 ┃ ┃ ┣ 📂 public/
 ┃ ┃ ┣ 📜 App.jsx              # 루트 컴포넌트
 ┃ ┃ ┣ 📜 index.css            # 전역 스타일
 ┃ ┃ ┣ 📜 Layout.jsx           # 레이아웃 컴포넌트
 ┃ ┃ ┣ 📜 main.jsx             # 엔트리 포인트
 ┃ ┣ 📜 eslint.config.js
 ┃ ┣ 📜 index.html
 ┃ ┣ 📜 package-lock.json
 ┃ ┣ 📜 package.json
 ┃ ┗ 📜 vite.config.js
 ┗ 📜 README.md
```

## 📂 `docs/` 폴더 내 문서 목록

- 🧭 **[ui-design.md](./docs/ui-design.md)**  
  와이어프레임 이미지 및 주요 화면 흐름에 대한 설명을 포함합니다.

- 🧩 **[component-guide.md](./docs/component-guide.md)**  
  주요 UI 컴포넌트들의 역할, props 구조, 사용 위치 등을 정리한 문서입니다.

- 🔄 **[state-flow.md](./docs/state-flow.md)**  
  Zustand 또는 Redux 기반의 상태 관리 구조와 흐름도를 설명합니다.
