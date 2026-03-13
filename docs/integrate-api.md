## Plan: 使用 react-query 整合選舉 API

TL;DR - 新增一個簡潔的 HTTP 包裝層與型別化的 react-query hooks，用來取得縣/鄉的候選人摘要、快取地理拓樸資源，並將頁面/元件改為以 query 結果為資料來源。保留 mock/local 回退以維持開發時的現有行為。

**Steps**

1. 新增中央 HTTP 與 API 層：在 [src/lib/api.ts](src/lib/api.ts) 實作共用的 fetch 包裝 `fetchJson()`，以及 `getCountySummaries(params)`、`getCountySummaryById(id)`、`getTownSummaries(params)` 等高階函式；提供 `mock` 模式以在開發時回傳本地 [src/data] 的資料。
2. 新增 query key 幫助程式：在 [src/lib/queryKeys.ts](src/lib/queryKeys.ts) 匯出統一的 key 工廠（例如 `countySummaries(params)`、`countySummary(id)`、`townSummaries(params)`、`topology(name)`）。
3. 在 [src/hooks/] 建立 react-query hooks：
   - `useCountySummaries(params)` — 取得各縣市前三名或摘要列表
   - `useCountySummary(id)` — 取得單一縣市的完整候選人資料
   - `useTownSummaries(params)` — 取得各鄉鎮前三名
   - `useTopologies()` — 下載並快取 `taiwan-counties.json` 與 `taiwan-towns.json`
4. 在 [src/main.tsx](src/main.tsx)（或包在 App）新增 `QueryClientProvider`，設定合理的預設值（例如 `staleTime`，及可選的 `refetchInterval` 用於即時更新）。
5. 將原本直接同步匯入資料的頁面/元件替換為使用 hooks：
   - [src/pages/DashboardPage.tsx](src/pages/DashboardPage.tsx) → 使用 `useCountySummaries()`，並將 `data` 傳給 `ElectionStats` / `CountyMap`。
   - [src/pages/CountyDetail.tsx](src/pages/CountyDetail.tsx) → 使用 `useCountySummary(countyId)` 與 `useTopologies()`；將結果傳給 `CandidateTable` 與 `TownshipMap`。
   - 更新 [src/components/Map/CountyMap.tsx](src/components/Map/CountyMap.tsx) 與 [src/components/Map/TownshipMap.tsx](src/components/Map/TownshipMap.tsx)，以接受 loading / error 狀態與從 props 傳入的資料。
6. 新增測試或手動驗證步驟，並在開發環境提供 `mock` 切換，以保留現有本地行為。

**API 回傳範例與對應**

上游 API 回傳的 JSON 結構與我們內部的 `CountyResult`/`TownshipResult` 不同。請在 `src/lib/api.ts` 新增正規化步驟（例如 `normalizeCountyApiItem`），將外部欄位映射到我們的型別，並處理政黨名稱對應與候選人數量限制。範例請求：

```bash
curl --location 'https://api.election.localhost/county-votes-summaries?year=2022&type=mayor&countyCode=63000&candidateLimit=3'
```

回應映射要點：
- 將外部的 `countyCode` 映射為 `countyId`，`countyName` 映射為 `countyName`。
- 轉換候選人欄位：`name`、`party`（將顯示用的政黨名稱對應到我們的 `Party` 聯合型別）、`votes` → `votes`、`voteShare` → `voteRate`（百分比）。
- 若 API 提供開票進度則填入 `votingProgress`，否則預設為 `0`。
- 遵守 `candidateLimit`：對候選人陣列做截斷或補足（必要時填入空位或標記）。
- 穩健處理遺失或非預期欄位，並將轉換錯誤紀錄於日誌或遙測中。

新增單元測試以覆蓋正規化邏輯（邊界案例：票率並列、缺欄位、未知政黨名稱）。

**Relevant files**

- [src/lib/api.ts](src/lib/api.ts) — 建立：共用的 fetch 包裝與 API 函式
- [src/lib/queryKeys.ts](src/lib/queryKeys.ts) — 建立：統一的 react-query key
- [src/hooks/useCountySummaries.ts](src/hooks/useCountySummaries.ts) — 建立：縣市摘要查詢 hook
- [src/hooks/useCountySummary.ts](src/hooks/useCountySummary.ts) — 建立：單一縣市查詢 hook
- [src/hooks/useTownSummaries.ts](src/hooks/useTownSummaries.ts) — 建立：鄉鎮摘要查詢 hook
- [src/hooks/useTopologies.ts](src/hooks/useTopologies.ts) — 建立：快取地理拓樸 JSON
- [src/main.tsx](src/main.tsx) — 修改：注入 `QueryClientProvider`
- [src/pages/DashboardPage.tsx](src/pages/DashboardPage.tsx) — 修改：改用 hooks
- [src/pages/CountyDetail.tsx](src/pages/CountyDetail.tsx) — 修改：改用 hooks
- [src/components/Map/CountyMap.tsx](src/components/Map/CountyMap.tsx) — 小幅修改 props
- [src/components/Map/TownshipMap.tsx](src/components/Map/TownshipMap.tsx) — 小幅修改 props

**Verification**

1. 啟動應用並在 `mock` 模式下確認 Dashboard 與先前顯示的資料一致。
2. 前往縣市詳細頁，確認候選人表格與地圖能顯示資料，且在查詢期間顯示 loading 狀態。
3. 若啟用即時更新（polling），確認 `refetchInterval` 能定期取得更新。
4. 使用模擬 `fetch` 的單元測試測試 `api` 函式，並利用 `@testing-library/react` 與 `@tanstack/react-query` 的 `QueryClientProvider` 幫助測試 hooks。

**Decisions**

- 採用原生 `fetch` 加上輕量 `fetchJson` 包裝（避免額外依賴），如需也可改用 `axios`。
- 對於靜態的拓樸 JSON 設為長時間快取（`staleTime: Infinity`）。
- 在 `api.ts` 暴露 `mock` 開關以利開發與測試。
