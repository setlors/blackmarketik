import { ShoppingBag } from "lucide-react";

export default function Market() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <ShoppingBag size={28} className="text-pink-hot" />
          <h1 className="text-3xl font-bold">Market</h1>
        </div>
      </div>
    </div>
  );
}
