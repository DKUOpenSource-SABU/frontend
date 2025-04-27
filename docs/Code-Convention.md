# 코드 컨벤션

## 사용 언어
- JavaScript

## 기본 규칙
- 들여쓰기(Indentation): 2칸 (스페이스 사용)
- 함수/변수명: snake_case
- 컴포넌트명: PascalCase
- 파일명 : PascalCase.jsx 또는 kebab-case.js
- 세미콜론: 붙이기
- 따옴표: "더블 쿼터"
- 상수: UPPER_SNAKE_CASE

## 컨벤션 예시
```javascript
// UserCard.jsx
import React from "react";

const TYPE = 1;

function UserCard({ name }) {
  return <div className="user-card">{name}</div>;
}

export default UserCard;

```

