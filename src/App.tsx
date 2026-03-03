import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/county/:countyId" element={<div>County</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
