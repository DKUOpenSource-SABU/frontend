# 🌐 State-flow.md

> 이 문서는 전역 상태 관리 흐름을 설명하며, `ClusterContext`와 `PathContext`의 구조 및 역할을 문서화합니다.

---

## 🧠 전역 상태 컨텍스트 요약

| Context 이름      | 주요 상태 변수      | 설명                                  |
|------------------|--------------------|---------------------------------------|
| `ClusterContext` | `data`, `ratio`    | 클러스터링 결과 및 종목별 비중 상태 관리 |
| `PathContext`    | `currentPath`      | 현재 페이지 경로 상태 관리 (탭 이동 등) |

---

## 🔷 ClusterContext

```jsx
import { ClusterProvider, useCluster } from '../contexts/ClusterContext';
```


### 💾 상태 변수
| 변수 이름   | 타입                                         | 설명                    |
| ------- | ------------------------------------------ | --------------------- |
| `data`  | `object` \| `null`                         | 클러스터링 결과 데이터 (PCA 포함) |
| `ratio` | `Array<{ symbol: string, ratio: number }>` | 종목별 포트폴리오 비중          |

### 🔧 함수
| 함수 이름         | 설명                                           |
| ------------- | -------------------------------------------- |
| `setData`     | 클러스터링 결과(PCA 등) 상태 설정                        |
| `setRatio`    | 비율 상태 직접 설정 (초기화 또는 일괄 업데이트 시 사용)            |
| `updateRatio` | 개별 종목의 비율을 수정하거나 새로 추가 (동일 symbol 존재 시 덮어쓰기) |

```jsx
const { data, ratio, setData, updateRatio } = useCluster();
updateRatio('AAPL', 15.5);
```

## 🔶 PathContext
```jsx
import { PathProvider, usePath } from '../contexts/PathContext';
```

### 💾 상태 변수
| 변수 이름         | 타입       | 설명                                     |
| ------------- | -------- | -------------------------------------- |
| `currentPath` | `string` | 현재 활성화된 페이지 경로 (예: `/home`, `/result`) |


### 🔧 함수
| 함수 이름            | 설명                    |
| ---------------- | --------------------- |
| `setCurrentPath` | 현재 페이지 경로 상태를 변경하는 함수 |

```jsx
const { currentPath, setCurrentPath } = usePath();
setCurrentPath('/setup');
```


## 🧩 구조도
```jsx
<App>
 ├─ <PathProvider>
 │    └─ <ClusterProvider>
 │         └─ 전체 페이지 트리 (Page, Layout, Components...)
 ```
