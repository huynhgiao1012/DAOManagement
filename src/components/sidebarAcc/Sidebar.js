import "./sidebar1.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { NavLink, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="top">
        <span className="name">DAO - MANAGEMENT</span>
      </div>
      <div className="center">
        <ul style={{ marginTop: 20 }}>
          <NavLink
            to="/accountantProfile"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>My Profile</span>
            </li>
          </NavLink>
          <NavLink
            to="/carSpares"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Car Spares</span>
            </li>
          </NavLink>
          <NavLink
            to="/form"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "none")}
          >
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Order Forms</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
