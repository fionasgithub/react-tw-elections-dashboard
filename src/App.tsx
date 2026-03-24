import { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";

const CountyDetail = lazy(() => import("@/pages/CountyDetail"));

function App() {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="p-6 text-sm text-muted-foreground">載入中…</div>
        }
      >
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/county/:countyId" element={<CountyDetail />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
