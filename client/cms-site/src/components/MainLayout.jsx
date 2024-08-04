import { Outlet, useNavigate  } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const navigate = useNavigate()
  return (
    <>
      <div className="main">
        <Sidebar />
        <div className="container">
          <div className="navbar">
            <button
              className="container-button "
              onClick={() => {
                localStorage.removeItem("access_token");
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
