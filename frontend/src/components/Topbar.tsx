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
interface Heist {
  id: string;
  name: string;
  pay: number;
  difficulty: string;
}

export default function Topbar() {
  const [user, setUser] = useState<User[]>([]);
  const [heist, setHeist] = useState<Heist | null>(null);

  useEffect(() => {
    const loadUser = () => {
      fetch("http://localhost:5000/users")
        .then((res) => res.json())
        .then((data) => setUser(data));
    };

    const loadHeist = () => {
      fetch("http://localhost:5000/heists")
        .then((res) => res.json())
        .then((data) => {
          const next = Array.isArray(data) ? data[0] : data;
          setHeist(next ?? null);
        })
        .catch(() => setHeist(null));
    };

    loadUser();
    loadHeist();
    window.addEventListener("groshi", loadUser);
    return () => window.removeEventListener("groshi", loadUser);
  }, []);

  const current = user[0];

  return (
    <div className="topbar flex items-center gap-6">
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

      {heist && (
        <div className="hidden sm:flex items-center gap-3 px-6 py-2 bg-pink-hot/10 border border-pink-hot/50 rounded-full">
          <span className="text-sm font-bold text-white tracking-wider">
            NEXT HEIST: <span className="text-pink-light">{heist.name}</span>
          </span>
          <span className="text-xs font-black text-pink-hot bg-black/50 px-2 py-1 rounded">
            ${heist.pay} • {heist.difficulty?.toUpperCase()}
          </span>
        </div>
      )}

      <div className="balance flex items-center gap-2 text-pink-hot font-bold text-lg">
        <DollarSign size={24} />
        <span>{current ? current.wallet : 0}</span>
      </div>
    </div>
  );
}
