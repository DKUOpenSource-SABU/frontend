# 🧭 UI 디자인 문서

## 개요
이 문서는 전체 화면의 흐름과 레이아웃 구조를 설명하기 위해 작성되었습니다.  
와이어프레임 이미지, 페이지 전환 흐름, 사용자 인터랙션 등을 포함합니다.


## 1. 전체 와이어프레임

> `./wireframes/main-ui.png`

![Main Wireframe](./main-ui.png)


## 2. 페이지별 설명

### 2-1. 로그인 페이지

- 구성 요소: 이메일 입력, 비밀번호 입력, 로그인 버튼
- UX 고려 사항: 잘못된 입력 시 실시간 에러 메시지 표시

### 2-2. 대시보드

- 주요 기능: 프로젝트 리스트, 생성 버튼, 최근 알림 표시
- 사용자 흐름: 로그인 → 대시보드 → 프로젝트 상세

## 3. 사용자 플로우

```mermaid
graph TD
    Login --> Dashboard
    Dashboard --> ProjectList
    ProjectList --> ProjectDetail
