import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Market from "./components/Market";

import Inventory from "./components/Inventory";
import Topbar from "./components/Topbar";
import Contracts from "./components/Contracts";
import { Flower2, Flower } from "lucide-react";

const flowers = [
  {
    Icon: Flower2,
    className: "left-[65%] top-[50%] rotate-[-18deg]",
    size: 72,
  },
  { Icon: Flower, className: "left-[18%] top-[20%] rotate-[12deg]", size: 54 },
  { Icon: Flower2, className: "left-[52%] top-[8%] rotate-[8deg]", size: 64 },
  { Icon: Flower, className: "left-[76%] top-[16%] rotate-[-10deg]", size: 78 },
  { Icon: Flower2, className: "left-[90%] top-[40%] rotate-[16deg]", size: 58 },
  { Icon: Flower, className: "left-[24%] top-[57%] rotate-[6deg]", size: 66 },
  {
    Icon: Flower2,
    className: "left-[42%] top-[78%] rotate-[-14deg]",
    size: 88,
  },
  { Icon: Flower, className: "left-[85%] top-[74%] rotate-[10deg]", size: 62 },
];

export default function App() {
  return (
    <BrowserRouter>
      <div className="fixed inset-0 pointer-events-none">
        {flowers.map(({ Icon, className, size }, index) => (
          <Icon
            key={index}
            size={size}
            strokeWidth={1.5}
            className={`absolute text-pink-light/70 drop-shadow-[0_0_18px_rgba(255,183,197,0.35)] ${className}`}
          />
        ))}
      </div>
      <div className="relative flex h-screen w-screen gap-0">
        <div className="w-56 shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden bg-bg-dark/65 p-6">
          <Topbar />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Market />} />
              <Route path="market" element={<Market />} />
              <Route path="contracts" element={<Contracts />} />
              <Route path="inventory" element={<Inventory />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
