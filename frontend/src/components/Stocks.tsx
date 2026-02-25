import { TrendingUp } from "lucide-react";

export default function Stocks() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp size={28} className="text-pink-hot" />
          <h1 className="text-3xl font-bold">Stocks</h1>
        </div>
      </div>
    </div>
  );
}
