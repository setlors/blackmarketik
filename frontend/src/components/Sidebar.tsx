import { Link } from "react-router-dom";
import { ShoppingBag, TrendingUp, Package } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Where to?</h2>
      <nav>
        <ul>
          <li>
            <Link to="/market" className="flex items-center gap-3 active">
              <ShoppingBag size={20} />
              <span>Market</span>
            </Link>
          </li>
          <li>
            <Link to="/stocks" className="flex items-center gap-3">
              <TrendingUp size={20} />
              <span>Stocks</span>
            </Link>
          </li>
          <li>
            <Link to="/inventory" className="flex items-center gap-3">
              <Package size={20} />
              <span>Inventory</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
