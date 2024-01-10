import "./carSpare.scss";
import Sidebar from "../../../components/sidebarAcc/Sidebar";
import Navbar from "../../../components/navbar2/Navbar";
import Datatable from "../../../components/datatableAutopart";
import Datatable2 from "../../../components/subAutoPart";
import { Tabs } from "antd";

import * as xlsx from "xlsx";
import { useState } from "react";
const CarSpare = () => {
  const onChange = (key) => {
    // console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "LIST OF BRANDS",
      children: <Datatable />,
    },
    {
      key: "2",
      label: "LIST OF CAR SPARES",
      children: <Datatable2 />,
    },
  ];
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

export default CarSpare;
