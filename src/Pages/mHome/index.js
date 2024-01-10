import SidebarMa from "../../components/sidebarMa/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/chart";
import Table from "../../components/table/Table";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    window.history.forward();
  }, []);
  return (
    <div className="home">
      <SidebarMa />
      <div className="homeContainer"></div>
    </div>
  );
};

export default Home;
