import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Market from "./components/Market";
import Stocks from "./components/Stocks";
import Inventory from "./components/Inventory";
import Topbar from "./components/Topbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Topbar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Market />} />
            <Route path="market" element={<Market />} />
            <Route path="stocks" element={<Stocks />} />
            <Route path="inventory" element={<Inventory />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
