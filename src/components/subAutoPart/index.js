import "./autopart2.scss";
import { useEffect, useState } from "react";
import * as xlsx from "xlsx";
import { DataGrid } from "@mui/x-data-grid";
import { Col, Row, Select } from "antd";
import {
  useGetAllCarSparesMutation,
  useAddSubCarSparesMutation,
} from "../../services/Accountant";
import { useNavigate } from "react-router-dom";

const Datatable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState([]);
  const [option, setOption] = useState("");
  const [getAllCarSpares] = useGetAllCarSparesMutation();
  const [addSubCarSpares] = useAddSubCarSparesMutation();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    setBrand([]);
    getAllCarSpares()
      .unwrap()
      .then((payload) => {
        let newArr = [];
        payload.carSpares.map((val) => {
          const obj = {
            value: val._id,
            label: val.brand,
          };
          newArr.push(obj);
        });
        setBrand((prev) => [...prev, ...newArr]);
      })
      .catch((error) => {
        if (error.status === 401) {
          logOut();
        }
      });
  }, []);
  const handleChange = (value) => {
    setOption(value);
  };
  const readUploadFile = (e) => {
    setData([]);
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setData((prev) => [...prev, ...json]);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const actionColumn = [
    {
      field: "ID",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "Price",
      headerName: "Price",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "Amount",
      headerName: "Amount",
      flex: 1,
      headerAlign: "center",
    },
  ];
  const handleAdd = () => {
    if (option.length === 0) {
      alert("Please choose brand to add");
    } else if (data.length === 0) {
      alert("Please upload excel file");
    } else {
      let arr = data.map((val) => {
        return {
          carSpareId: option,
          name: val.Name,
          price: val.Price,
          number: val.Amount,
        };
      });
      addSubCarSpares({ data: [...arr] })
        .unwrap()
        .then((payload) => {
          if (payload.success) {
            alert(payload.message);
          }
        })
        .catch((error) => {
          if (error.status === 401) {
            logOut();
          }
        });
    }
  };
  return (
    <div className="list" style={{ display: "flex", flexDirection: "column" }}>
      <form
        style={{
          margin: 20,
          backgroundColor: "#3cbcc4",
          padding: "10px 20px",
          borderRadius: 10,
          width: 190,
        }}
      >
        <label
          htmlFor="upload"
          style={{
            marginBottom: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Upload Excel File
        </label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
          style={{
            display: "none",
          }}
        />
      </form>
      {data.length > 0 && (
        <div style={{ height: 500, padding: "0px 20px" }}>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col span={17}>
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                  className="datagrid"
                  rows={data}
                  getRowId={(row) => row.ID}
                  columns={actionColumn}
                  pageSizeOptions={[10, 20, 30]}
                  disableVirtualization
                  rowSelection={false}
                  sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: "white",
                    width: "95%",
                  }}
                />
              </div>
            </Col>
            <Col span={7}>
              <Select
                showSearch
                onChange={handleChange}
                style={{
                  width: "90%",
                  border: "2px solid #3cbcc4",
                }}
                placeholder="Select Brand"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={brand}
              />
              <button
                onClick={handleAdd}
                style={{
                  width: "90%",
                  backgroundColor: "#3cbcc4",
                  margin: "20px 0px",
                  border: "none",
                  padding: "5px 20px",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 10,
                  fontSize: 16,
                }}
              >
                Add Data
              </button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Datatable;
