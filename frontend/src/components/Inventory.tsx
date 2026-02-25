import { Package } from "lucide-react";

export default function Inventory() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package size={28} className="text-pink-hot" />
          <h1 className="text-3xl font-bold">Inventory</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 pr-4"></div>
    </div>
  );
}
