# 🧩 컴포넌트 가이드

## 개요
이 문서는 프로젝트에 사용된 주요 **공통 컴포넌트**들의 역할과 props 인터페이스, 내부 구조를 설명합니다.

---

## 1. 공통 컴포넌트 목록

| 컴포넌트 이름 | 위치 | 설명 |
|---------------|------|------|
| `Button` | `src/components/Button.jsx` | 기본 버튼 |
| `Card` | `src/components/Card.jsx` | 대시보드 카드 UI |
| `Modal` | `src/components/Modal.jsx` | 팝업 레이어 |

---

## 2. 컴포넌트 상세 설명

### `Button`

```jsx
<Button variant="primary" onClick={handleClick}>
  확인
</Button>
