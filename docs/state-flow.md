# 🔄 상태 흐름 구조 (Zustand)

## 개요
이 문서는 Zustand 기반 상태 관리 흐름과 store 정의, 주요 전역 상태 변수, 사용 위치 등을 설명합니다.

---

## 1. 상태 관리 라이브러리

- 사용: [`Zustand`](https://github.com/pmndrs/zustand)
- 도입 이유:
  - Redux 대비 가볍고 보일러플레이트 적음
  - 전역 상태와 로컬 상태 분리가 쉬움

---

## 2. 전역 상태 구조

### Store 파일: `src/store/projectStore.js`

```js
import { create } from 'zustand'

export const useProjectStore = create((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
}))
