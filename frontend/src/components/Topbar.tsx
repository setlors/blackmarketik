import { User, DollarSign } from "lucide-react";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="flex items-center gap-6 flex-1">
        <div className="userinfo">
          <div className="usimg">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-light">User</p>
          </div>
        </div>
      </div>

      <div className="balance flex items-center gap-2 text-pink-hot font-bold text-lg">
        <DollarSign size={24} />
        <span>0</span>
      </div>
    </div>
  );
}
