import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage></DashboardPage>} />
        <Route path="/county/:countyId" element={<div>County</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
