import { User as UserIcon, DollarSign, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { apiFetch } from "../process/api";

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
  const [isLogged, setIsLogged] = useState(
    () => !!localStorage.getItem("bm_token"),
  );
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [heist, setHeist] = useState<Heist | null>(null);
  const [heistItems, setHeistItems] = useState<string[]>([]);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ username: loginName, password: loginPass }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("bm_token", data.token);
        setIsLogged(true);
        setLoginName("");
        setLoginPass("");
      } else {
        alert(data.error || "Login error");
      }
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("bm_token");
    setIsLogged(false);
    setUser(null);
    setHeistItems([]);
    window.location.reload();
  };

  const loadHeist = () => {
    apiFetch("/heists")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const index = Math.floor(Math.random() * data.length);
          setHeist(data[index]);
        } else setHeist(data ?? null);
      })
      .catch(() => setHeist(null));
  };

  useEffect(() => {
    if (!isLogged) return;

    const loadUser = () => {
      apiFetch(`/profil?t=${Date.now()}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not logged in");
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => setUser(null));
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
  }, [isLogged]);

  const execute = async () => {
    if (heistItems.length === 0) {
      alert("You have to pick at least 1 item");
      return;
    }

    const currentUser = user;
    if (!currentUser || !heist) {
      alert("Missing user or heist data");
      return;
    }

    try {
      const response = await apiFetch("/heists", {
        method: "POST",
        body: JSON.stringify({
          heistId: heist.id,
          usedItemsId: heistItems,
        }),
      });
      const result = await response.json();
      alert(result.message);
      window.dispatchEvent(new Event("groshi"));
      window.dispatchEvent(new Event("clearQueue"));
      loadHeist();
      setHeistItems([]);
    } catch (error) {
      console.error("Something went wrong when executing mission", error);
    }
  };

  if (!isLogged) {
    return (
      <div className="topbar flex items-center justify-end w-full gap-6 p-4">
        <form onSubmit={handleLogin} className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Username"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            className="px-3 py-1.5 bg-gray-900 border border-gray-700 text-white text-sm rounded outline-none focus:border-pink-hot transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
            className="px-3 py-1.5 bg-gray-900 border border-gray-700 text-white text-sm rounded outline-none focus:border-pink-hot transition-colors"
            required
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-pink-hot/20 text-pink-hot border border-pink-hot/50 hover:bg-pink-hot hover:text-white rounded text-sm font-bold transition-all cursor-pointer"
          >
            LOGIN
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="topbar flex items-center justify-between w-full gap-6 p-4">
      <div className="balance flex items-center gap-2 text-pink-hot font-bold text-lg">
        <DollarSign size={24} />
        <span>{user ? user.wallet : 0}</span>
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
      <div className="flex items-center gap-4">
        <div className="userinfo flex items-center gap-3">
          <div className="usimg text-text-light">
            <UserIcon size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-light">
              {user ? user.username : "User"}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          title="Logout"
          className="text-text-light hover:text-pink-hot transition-colors cursor-pointer"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}
