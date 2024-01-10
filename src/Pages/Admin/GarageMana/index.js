import "./admin2.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar2/Navbar";
import {
  useGetUserDetailMutation,
  useUpdateInfoMutation,
} from "../../../services/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row, Form, Input, Upload, Skeleton } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { IP } from "../../../Utils/constants";
import Datatable from "../../../components/datatable2/Datatable";
import Datatable3 from "../../../components/datatable3/Datatable";
import { Tabs } from "antd";

const GarageMana = () => {
  const navigate = useNavigate();
  const loadData = () => {};
  useEffect(() => {
    loadData();
  }, []);
  const onChange = (key) => {};
  const items = [
    {
      key: "1",
      label: "GARAGE",
      children: <Datatable />,
    },
    {
      key: "2",
      label: "MANAGER",
      children: <Datatable3 />,
    },
  ];
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          tabBarStyle={{
            paddingLeft: 20,
            color: "#34acaf",
            fontWeight: "bold",
            marginBottom: 0,
          }}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
};

export default GarageMana;
