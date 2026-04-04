import { User as UserIcon, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  password: string;
  wallet: number;
  inventory: string[];
  portfolio: string[];
}

export default function Topbar() {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const current = user[0];

  return (
    <div className="topbar">
      <div className="flex items-center gap-6 flex-1">
        <div className="userinfo">
          <div className="usimg">
            <UserIcon size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-light">
              {current ? current.username : "User"}
            </p>
          </div>
        </div>
      </div>

      <div className="balance flex items-center gap-2 text-pink-hot font-bold text-lg">
        <DollarSign size={24} />
        <span>{current ? current.wallet : 0}</span>
      </div>
    </div>
  );
}
