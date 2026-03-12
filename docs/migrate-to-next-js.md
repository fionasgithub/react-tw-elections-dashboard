## Plan: Next.js 轉換 — 縣市頁面與 sitemap

TL;DR

- 將現有 SPA 路由 `/county/:countyId` 轉到 Next.js（app router 建議：`app/county/[countyId]/page.tsx`），並選擇是否用 slug（需新增 mapping 表）。
- 在縣市頁實作 `generateMetadata`，依 slug 回傳動態 `title`、`description`。
- 在頁面內插入結構化資料（JSON-LD）。
- 新增自動產生 `sitemap.xml` 的 route 或 build 腳本，列出所有縣市路徑。
- 前端資料取用改用 `@tanstack/react-query`，並用 `zod` 做輸入/回傳驗證。

0. 安裝與專案設定
   - 安裝 Next.js 與 React: `npm install next@latest react@latest react-dom@latest`。
   - 更新 `package.json` 的 scripts：把現有 `dev` / `start` 指令替換為 Next.js 指令，例如：
     - `dev`: `next dev`
     - `build`: `next build`
     - `start`: `next start`
     - 視需求可加入 `export` 或 `postbuild` 腳本。
   - 移除 `react-router-dom` 及相關路由程式碼（以 Next.js 的 `Link` 與頁面路由取代）。

**Steps**

1. 建立 slug mapping（選項）
   - 新檔 `src/data/countySlugs.ts`：一個雙向映射 `countyId <-> slug`，或在 `src/data/electionResults.ts` 加欄位 `slug`。_（可選，若需漂亮網址）_
2. 新增 Next.js 動態頁面
   - 新檔 `app/county/[countyId]/page.tsx`：把 [src/pages/CountyDetail.tsx](src/pages/CountyDetail.tsx#L1-L98) 的呈現邏輯改寫為 server component + client map 子元件（map 加 `"use client"`）。
     - 注意：若任何檔案使用 `useState`、`useEffect`、事件處理（`onClick`、`onChange`）或瀏覽器原生物件（`window`, `document`, localStorage 等），該檔案頂端必須加上 `"use client"`。
3. 實作 `generateMetadata`
   - 在 `app/county/[countyId]/page.tsx` export `generateMetadata({params})`，使用 `getCountyResultById` 取得資料，回傳：
     - `title`: "2026 {縣市名稱}開票結果 - 即時更新"（例如："2026 桃園市開票結果 - 即時更新"）
     - `description`: "掌握最新{縣市名稱}候選人得票數與開票進度..."
4. 加入 JSON-LD
   - 在 page server component 裡產生一段 JSON-LD（`@context`, `@type`、`name`, `url`, `datePublished`, 簡短 `aggregateRating`/`data` summary），以 `<script type="application/ld+json">` 輸出（server-side）。
5. Sitemap 產生器
   - 建議：建立 `app/sitemap.xml/route.ts`，在 `GET` 中讀取 `getCountyResults()` 或 `taiwan-counties.json` 產生 sitemap XML（URL 使用 slug 或 countyId）。
   - 另一選項：建立 build 腳本生成 `public/sitemap.xml`（`package.json` 新 script）。
6. API 與驗證
   - 新增依賴：`@tanstack/react-query`、`zod`。
   - 建議做法：在 client component（需要 polling 或互動的部分）使用 `useQuery` / `useMutation`，並在 fetch 層使用 `zod` schema 驗證 response（或對於內部資料來源，於 server loader 使用 `zod` 驗證再傳給 client）。
7. 更新連結與導航
   - 把所有建立縣市連結的地方（如 Dashboard）改為指向新路徑；若使用 slug，改為以 slug 為參數。
8. 測試 & 部署調整
   - 本地測試 SSR/SSG、檢查 meta 標籤、JSON-LD 是否正確嵌入；sitemap 可被抓取；react-query 在 client-side 正常工作。

- `package.json` — 更新 scripts 並加入 `next` 相關設定；移除 `react-router-dom` 的相依性。
- `package.json`（dependencies）— 新增 `next`, `react`, `react-dom`, `@tanstack/react-query`, `zod`。

**Relevant files**

- [src/pages/CountyDetail.tsx](src/pages/CountyDetail.tsx#L1-L98) — 轉換目標內容，作為 page.tsx 的參考。
- [src/App.tsx](src/App.tsx#L9-L11) — 現有路由定義，要替換的地方。
- [src/data/electionResults.ts](src/data/electionResults.ts#L1-L200) — 主要資料與 helper（`getCountyResultById`, `getCountyResults`）。
- [src/data/taiwan-counties.json](src/data/taiwan-counties.json#L1-L50) — 可用來列舉縣市或驗證。
- [src/data/taiwan-towns.json](src/data/taiwan-towns.json#L23572-L23600) — 鄉鎮資料（若需更細資訊）。
- [src/components/Map/TownshipMap.tsx](src/components/Map/TownshipMap.tsx#L1-L30) — 客戶端地圖元件，保留但需加 `"use client"`。
- [src/components/CountyDetail/CandidateTable.tsx](src/components/CountyDetail/CandidateTable.tsx#L1-L200) — UI 元件，重用。
- [src/types/elections.ts](src/types/elections.ts#L57-L65) — 型別，可轉為 zod schema 的基礎。

**Verification**

1. 功能驗證
   - 開啟 `app/county/<countyId or slug>`，檢查頁面能正確 render、metadata 在 head 裡（title/description）、JSON-LD 可見於頁面 source。
2. Sitemap
   - 存取 `/sitemap.xml` 返回的內容包含所有縣市路徑且格式合法（可用 https://www.xml-sitemaps.com/ 驗證）。
3. React Query + Zod
   - 對一個 client fetch 實作 `useQuery` 並用 `zod` 驗證 response；寫一個小測試或在瀏覽器 console 檢查驗證錯誤情況被捕捉。

**Decisions / Assumptions**

- 以 `app` router（Next.js app directory）為首選，因為要用 `generateMetadata` 與 server component 功能。
- Slug 是選配：若要 SEO-friendly URL，我會新增 `src/data/countySlugs.ts` 並在全站替換連結；若要快速遷移，可先保留 numeric `countyId`。
- 資料來源目前都是本地 `src/data/*`，未發現外部 API 呼叫；若未來改為外部 API，可在 server component 中 `fetch` 並用 zod 驗證。

**Further Considerations**

1. JSON-LD schema type：建議使用 `Dataset` 或 `Dataset` + `Article` 組合，視乎你要讓搜尋引擎如何理解資料。
2. Sitemap host：在生產環境的完整 URL 需要 hostname（建議用 `process.env.SITE_URL` 在 server route 中補全）。
3. 客戶端地圖：TopoJSON 處理與 D3 應繼續留在 client bundle，確保在 server component 嵌入的地圖子元件加 `"use client"`。

---

如果你同意，我可以接續實作第一個可驗證的里程碑：

- Scaffold `app/county/[countyId]/page.tsx`，含 `generateMetadata`、JSON-LD、以及 sitemap route。
