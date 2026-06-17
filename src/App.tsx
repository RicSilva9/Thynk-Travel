import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
