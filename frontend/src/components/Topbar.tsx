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
  const [heistItems, setHeistItems] = useState<string[]>([]);

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

    const qUpd = (event: Event) => {
      const customEvent = event as CustomEvent<string[]>;
      setHeistItems(customEvent.detail ?? []);
    };

    window.addEventListener("groshi", loadUser);
    window.addEventListener("heistItemsUpd", qUpd);
    return () => {
      window.removeEventListener("groshi", loadUser);
      window.removeEventListener("heistItemsUpd", qUpd);
    };
  }, []);

  const execute = async () => {
    if (heistItems.length === 0) {
      alert("You have to pick at least 1 item");
      return;
    }

    const currentUser = user[0];
    if (!currentUser || !heist) {
      alert("Missing user or heist data");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/heists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          heistId: heist.id,
          usedItemsId: heistItems,
        }),
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Something went wrong when executing mission", error);
    }
  };

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
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 px-6 py-2 bg-pink-hot/10 border border-pink-hot/50 rounded">
            <span className="text-sm font-bold text-white tracking-wider">
              NEXT HEIST:{" "}
              <span className="text-pink-light">
                {heist.name?.toUpperCase()}
              </span>
            </span>
            <span className="text-xs font-black text-white tracking-wider">
              ${heist.pay} • {heist.difficulty?.toUpperCase()}
            </span>
          </div>
          <button
            onClick={execute}
            className="flex items-center gap-3 px-5 py-1.5 rounded cursor-pointer transition-all"
          >
            Execute
          </button>
        </div>
      )}

      <div className="balance flex items-center gap-2 text-pink-hot font-bold text-lg">
        <DollarSign size={24} />
        <span>{current ? current.wallet : 0}</span>
      </div>
    </div>
  );
}
