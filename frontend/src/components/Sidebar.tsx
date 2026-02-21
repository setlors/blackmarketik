import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Where to?</h2>
      <nav>
        <ul>
          <li>
            <Link to="/market">Market</Link>
          </li>
          <li>
            <Link to="/stocks">Stocks</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
