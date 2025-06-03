# 🧩 컴포넌트 가이드

## 개요
이 문서는 프로젝트에 사용된 주요 **공통 컴포넌트**들의 역할과 props 인터페이스, 내부 구조를 설명합니다.

---

## 1. 공통 컴포넌트 목록

| 컴포넌트 이름             | 위치                                     | 설명                                  |
| ------------------- | -------------------------------------- | ----------------------------------- |
| `BacktestDashboard` | `src/components/BacktestDashboard.jsx` | 백테스트 요약 및 전략별 수익률 시각화 컴포넌트          |
| `ClusterChart`      | `src/components/ClusterChart.jsx`      | 클러스터링 결과를 산점도로 시각화 (nodes, hull 포함) |
| `ClusterFilter`     | `src/components/ClusterFilter.jsx`     | 클러스터 그룹 필터링 UI (섹터/성장률 기반)          |
| `ClusterView`       | `src/components/ClusterView.jsx`       | 클러스터링 결과 종합 뷰 (차트 + 정보)             |
| `LeaderboardTicker` | `src/components/LeaderboardTicker.jsx` | 수익률 기준 상위 종목을 리더보드 형태로 표시           |
| `Logo`              | `src/components/Logo.jsx`              | 앱 로고 또는 제목 텍스트 UI                   |
| `MonthPicker`       | `src/components/MonthPicker.jsx`       | 월 단위 선택용 커스텀 달력 컴포넌트                |
| `ProgressBar`       | `src/components/ProgressBar.jsx`       | 로딩/진행률 시각화용 수평 바                    |
| `SearchBox`         | `src/components/SearchBox.jsx`         | 종목 검색창 (자동완성, 추가 기능 포함)             |
| `SectorChart`       | `src/components/SectorChart.jsx`       | 섹터별 클러스터링 결과 차트                     |
| `SectorHeatmap`     | `src/components/SectorHeatmap.jsx`     | 섹터별 ETF 히트맵 시각화                     |
| `Spinner`           | `src/components/Spinner.jsx`           | 로딩 스피너 컴포넌트                         |
| `StockData`         | `src/components/StockData.jsx`         | 선택된 종목의 데이터 요약 카드                   |
| `StockTable`        | `src/components/StockTable.jsx`        | 종목별 상세 데이터 테이블 (수익률, 지표 등)          |
| `TickerDetail`      | `src/components/TickerDetail.jsx`      | 특정 종목 상세 정보 뷰 (메타, 뉴스 포함 가능)        |


## 2. 컴포넌트 상세 설명

### `BacktestDashboard`

```jsx
<BacktestDashboard strategies={strategyList} />
```

- 백테스트 결과를 기반으로 다양한 전략 비교 시각화를 제공하는 핵심 대시보드 컴포넌트입니다.
- Line, Bar, Pie 차트를 포함하여 자산 구성과 수익률, 낙폭 등의 통계를 시각화합니다.

### 🧾 Props

| 이름           | 타입    | 설명                      |
| ------------ | ----- | ----------------------- |
| `strategies` | array | 전략별 백테스트 결과 객체 배열 (정렬됨) |

### `ClusterChart`

```jsx
<ClusterChart data={clusterData} ratio={allocationRatios} />
```

- 클러스터링 결과를 시각화하는 산점도(Scatter + Line) 기반 컴포넌트입니다.
- 각 클러스터 영역은 다각형 윤곽선으로, 각 종목은 버블 크기(비중)로 시각화됩니다.

### 🧾 Props

| 이름      | 타입     | 설명                                       |
| ------- | ------ | ---------------------------------------- |
| `data`  | object | 클러스터링 결과 객체 (nodes, hull\_coords 포함)     |
| `ratio` | array  | 각 티커에 대한 자산 비중 리스트 (`{ symbol, ratio }`) |


### `ClusterFilter`

```jsx
<ClusterFilter onFilterChange={handleClusterFilter} />
```

- 클러스터 ID를 기준으로 필터링할 수 있는 선택 UI입니다.
- "전체" 또는 개별 클러스터(색상 아이콘 포함)를 토글 방식으로 선택합니다.

### 🧾 Props

| 이름               | 타입       | 설명                                                    |
| ---------------- | -------- | ----------------------------------------------------- |
| `onFilterChange` | function | 필터 상태가 변경될 때 선택된 클러스터 리스트를 전달 (`[]` or `[0, 2, ...]`) |


### `ClusterView`

```jsx
<ClusterView selectedStocks={stockList} />
```

- 클러스터링 분석 결과를 종합적으로 보여주는 탭 기반 뷰입니다.
- 분석 점수, 클러스터링 차트, 섹터별 시각화, 선택 종목 현황을 포함합니다.

### 🧾 Props

| 이름               | 타입    | 설명                            |
| ---------------- | ----- | ----------------------------- |
| `selectedStocks` | array | 선택된 종목 배열 (`{ SYMBOL, ... }`) |

### `LeaderboardTicker`

```jsx
<LeaderboardTicker />
```
- 백엔드에서 백테스트 리더보드 데이터를 받아 상위 3개 전략을 카드 형태로 시각화합니다.
- 수익률, MDD, 전략명, 자산 구성 등 핵심 정보를 간결하게 보여줍니다.

### 🧾 Props

| 이름 | 타입 | 설명                    |
| -- | -- | --------------------- |
| 없음 | —  | 내부 API 요청을 통해 자동 렌더링됨 |

### `Logo`

```jsx
<Logo />
```
- 앱의 상단 또는 초기 화면에 표시되는 로고 컴포넌트입니다.
- 클릭 시 /home 경로로 이동하여 초기 상태로 돌아갑니다.

| 이름 | 타입 | 설명                                 |
| -- | -- | ---------------------------------- |
| 없음 | —  | 내부에서 `PathContext`를 사용하여 경로를 제어합니다 |

### `MonthPicker`

```jsx
<MonthPicker value="2025-05-01" onChange={handleDateChange} />
```

- 연도/월 단위 선택용 커스텀 드롭다운 캘린더입니다.
- Headless UI의 Popover를 활용해 간단한 월 선택 UI를 제공합니다.

### 🧾 Props

| 이름         | 타입       | 설명                               |
| ---------- | -------- | -------------------------------- |
| `label`    | string   | 선택창 상단에 표시할 라벨 (기본: "📅 월 선택")   |
| `value`    | string   | 초기 선택된 날짜 (YYYY-MM-DD)           |
| `onChange` | function | 날짜 선택 시 실행되는 콜백 (포맷: YYYY-MM-DD) |

### `ProgressBar`

```jsx
<ProgressBar progress={75} />
```

- 작업 진행률을 시각적으로 표시하는 로딩 컴포넌트입니다.
- 스피너 애니메이션과 함께 퍼센트 기반 진행 바를 렌더링합니다.

### 🧾 Props

| 이름         | 타입     | 설명                        |
| ---------- | ------ | ------------------------- |
| `progress` | number | 진행률 값 (0\~100), 기본값은 `90` |


### `SearchBox`

```jsx
<SearchBox
  currentPath="/home"
  onSearchSubmit={handleSubmit}
  setCurrentPath={setPath}
  selectedStock={selectedList}
/>
```

- 주식 티커를 검색하고 추천 종목 또는 필터링된 리스트에서 선택할 수 있는 주요 입력 UI입니다.
- 추천 종목(cluster/recommend)과 클러스터 필터링 검색(search/ticker) API를 함께 활용합니다.

### 🧾 Props

| 이름               | 타입       | 설명                                      |
| ---------------- | -------- | --------------------------------------- |
| `currentPath`    | string   | 현재 경로 (`/home`, `/setup` 등)로 렌더링 조건 분기용 |
| `onSearchSubmit` | function | 선택된 종목을 부모에 전달하는 콜백                     |
| `setCurrentPath` | function | 경로 변경 함수 (예: `/home` → `/setup`)        |
| `selectedStock`  | array    | 선택된 종목 리스트 (추천 기반 조회에 사용)               |

### `SectorScatterChart`

```jsx
<SectorScatterChart sectorData={sectorData} />
```

- 섹터별 클러스터링 결과를 2차원 PCA 기준으로 시각화하는 산점도(Scatter) 차트입니다.
- 각 섹터는 PC1, PC2 좌표 기반으로 하나의 점으로 나타납니다.

### 🧾 Props

| 이름           | 타입    | 설명                                         |
| ------------ | ----- | ------------------------------------------ |
| `sectorData` | array | 각 섹터별 `PC1`, `PC2`, `sector` 값을 포함하는 객체 배열 |

### `SectorHeatmap`

```jsx
<SectorHeatmap selectedStocks={selectedStocks} />
```

- 선택된 종목들의 섹터 분포를 시각적으로 나타내는 그리드형 히트맵 컴포넌트입니다.
- 각 섹터는 사각형 카드 형태로 표시되며, 선택된 섹터는 색상으로 강조됩니다.

### 🧾 Props

| 이름               | 타입    | 설명                                       |
| ---------------- | ----- | ---------------------------------------- |
| `selectedStocks` | array | 선택된 종목 객체 배열 (각 객체는 `SECTOR` 필드를 포함해야 함) |


### `Spinner`

```jsx
<Spinner />
```
- 데이터 로딩 중임을 시각적으로 나타내는 원형 스피너 컴포넌트입니다.
- Tailwind CSS의 animate-spin 클래스를 활용해 회전 애니메이션 구현

### `StockTable`

```jsx
<StockTable selectedStocks={stocks} ratio={ratioData} />
```

- 선택한 종목 목록과 해당 종목의 분산투자 비율을 테이블 형식으로 표시합니다.

### 🧾 Props
| 이름               | 타입      | 필수 | 설명                                                  |
| ---------------- | ------- | -- | --------------------------------------------------- |
| `selectedStocks` | `Array` | ✅  | 선택된 종목 객체 배열 (`{ SYMBOL, CLUSTER, ... }`)           |
| `ratio`          | `Array` | ✅  | 각 종목별 `{ symbol: string, ratio: number }` 형태의 비율 정보 |

### `TickerDetail`

```jsx
<TickerDetail selectedStocks={stocks} />
```
- 선택된 종목들의 상세 데이터를 불러와 가격 그래프, 메타 정보, 뉴스 요약을 탭 형식으로 시각화합니다.

### 🧾 Props

| 이름               | 타입      | 필수 | 설명                                 |
| ---------------- | ------- | -- | ---------------------------------- |
| `selectedStocks` | `Array` | ✅  | 선택한 종목 목록 (예: `[{ SYMBOL, ... }]`) |
