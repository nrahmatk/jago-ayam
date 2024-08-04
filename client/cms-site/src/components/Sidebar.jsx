import { Link } from "react-router-dom";

export default function Sidebar({ setActiveComponent }) {
  return (
    <div className="sidebar">
      <h1>JagoAyam CMS</h1>
      {/* <div className="profile"></div> */}
      <div className="sidebar-item">
        <Link to="/">
          <button className="menu-btn">Dashboard</button>
        </Link>
        <Link to="/cuisines">
          <button className="menu-btn">Cuisines</button>
        </Link>
        <Link to="/categories">
          <button className="menu-btn">Categories</button>
        </Link>
        <Link to="/add-user">
          <button className="menu-btn">Add User</button>
        </Link>
      </div>
    </div>
  );
}
