import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import CountyDetail from "@/pages/CountyDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/county/:countyId" element={<CountyDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
