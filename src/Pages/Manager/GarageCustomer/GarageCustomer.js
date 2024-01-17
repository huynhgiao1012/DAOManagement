import "./style8.scss";
import Sidebar from "../../../components/sidebarMa/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import {
  useGetCustomerMutation,
  useGetNumFormMutation,
} from "../../../services/Manager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userColumns2 } from "../../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";

const GarageCustomer = ({ socket }) => {
  const navigate = useNavigate();
  const [getCustomer] = useGetCustomerMutation();
  const [getNumForm] = useGetNumFormMutation();
  const [data, setData] = useState([]);
  const [numForm, setNum] = useState([]);
  useEffect(() => {
    setData([]);
    getCustomer()
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.data.map((val) => {
          newArr.push({
            id: val._id,
            name: val.name,
            email: val.email,
            phone: val.phone,
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
  useEffect(() => {
    let arr = [];
    data.map((val) => {
      getNumForm({ id: val.id })
        .unwrap()
        .then((payload) => {
          const obj = { id: val.id, numForm: payload.data.length };
          arr.push(obj);
          setNum((prev) => [...prev, ...arr]);
        })
        .catch((error) => {
          if (error.status === 401) {
            navigate("/login");
          }
        });
    });
  }, [data]);
  const actionColumn = [
    {
      field: "numOfUse",
      headerName: "Used Service Times",
      flex: 1,
      headerAlign: "center",
      valueGetter: (params) => {
        if (numForm.length > 0) {
          return numForm.find((val) => val.id === params.row.id).numForm;
        }
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
            <div className="viewButton">Upgraded VIP</div>
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
