import "./style8.scss";
import Sidebar from "../../../components/sidebarMa/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import {
  useGetCustomerMutation,
  useGetNumFormMutation,
  useUpdateIsVipMutation,
} from "../../../services/Manager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userColumns2 } from "../../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";

const GarageCustomer = ({ socket }) => {
  const navigate = useNavigate();
  const [getCustomer] = useGetCustomerMutation();
  const [updateVIP] = useUpdateIsVipMutation();
  const [data, setData] = useState([]);
  const [numForm, setNum] = useState([]);
  useEffect(() => {
    setData([]);
    console.log("hihi");
    getCustomer()
      .unwrap()
      .then((payload) => {
        console.log("payload", payload.data);
        var newArr = [];
        payload.data.map((val) => {
          newArr.push({
            id: val._doc._id,
            name: val._doc.name,
            email: val._doc.email,
            phone: val._doc.phone,
            point: val.point,
            isVip: val.isVip ? "VIP" : "Standard",
            num: val.numForm,
          });
        });
        setData((prev) => [...prev, ...newArr]);
      })
      .catch((error) => {
        if (error.status === 401) {
          navigate("/login");
        }
      });
  }, []);
  const handleUpgrade = (id) => {
    updateVIP({ id })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          setData([]);
          getCustomer()
            .unwrap()
            .then((payload) => {
              var newArr = [];
              payload.data.map((val) => {
                newArr.push({
                  id: val._doc._id,
                  name: val._doc.name,
                  email: val._doc.email,
                  phone: val._doc.phone,
                  point: val.point,
                  isVip: val.isVip ? "VIP" : "Standard",
                  num: val.numForm,
                });
              });
              setData((prev) => [...prev, ...newArr]);
            })
            .catch((error) => {
              if (error.status === 401) {
                navigate("/login");
              }
            });
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          navigate("/login");
        }
      });
  };
  const actionColumn = [
    {
      field: "numOfUse",
      headerName: "Used Service Times",
      flex: 1,
      headerAlign: "center",
      valueGetter: (params) => {
        return params.row.num;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleUpgrade(params.row.id)}
            >
              Upgraded VIP
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar socket={socket} />
        <div className="dataTable">
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns2.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            disableVirtualization
            rowSelection={false}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "white",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GarageCustomer;
