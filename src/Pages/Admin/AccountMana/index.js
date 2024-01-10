import "./admin3.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar2/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Datatable from "../../../components/datatable/Datatable";

const AccountMana = () => {
  const navigate = useNavigate();
  const loadData = () => {};
  useEffect(() => {
    loadData();
  }, []);
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default AccountMana;
