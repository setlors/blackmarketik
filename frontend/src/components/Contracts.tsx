import { Briefcase } from "lucide-react";

export default function Contracts() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase size={28} className="text-pink-hot" />
          <h1 className="text-3xl font-bold">Contracts</h1>
        </div>
      </div>
    </div>
  );
}
