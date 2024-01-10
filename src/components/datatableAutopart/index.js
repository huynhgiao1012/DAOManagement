import "./autopart.scss";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { brandColumn } from "../../datatablesource";
import { Col, Form, Input, Row, Upload, Button, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { IP } from "../../Utils/constants";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  useAddCarSparesMutation,
  useGetAllCarSparesMutation,
} from "../../services/Accountant";
const Datatable = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [isUpdate, setUpdate] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [addCarSpares] = useAddCarSparesMutation();
  const [getAllCarSpares] = useGetAllCarSparesMutation();
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const loadData = () => {
    setData([]);
    getAllCarSpares()
      .unwrap()
      .then((payload) => {
        setData((prev) => [...prev, ...payload.carSpares]);
      })
      .catch((error) => {
        if (error.status === 401) {
          logOut();
        }
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const props = {
    name: "file",
    action: `http://${IP}:3000/api/v1/manager/upload`,
    headers: {
      authorization: "authorization-text",
    },
    async onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        const base64 = await convertToBase64(info.file.originFileObj);
        setImage(base64);
      } else if (info.file.status === "error") {
      }
    },
  };
  const onSubmit = async (value) => {
    const obj = {
      brand: value.brand.toUpperCase(),
      img: image,
    };
    await addCarSpares({ ...obj })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          loadData();
          form.resetFields();
          setImage("");
          alert(payload.message);
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          logOut();
        }
      });
  };
  return (
    <div className="datatable">
      <Row gutter={16}>
        <Col span={12}>
          {isLoading ? (
            <div style={{ margin: 20 }}>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </div>
          ) : (
            <DataGrid
              className="datagrid"
              getRowId={(row) => row._id}
              rows={data}
              columns={brandColumn}
              rowsPerPageOptions={[9]}
              rowSelection={false}
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "white",
                width: "95%",
              }}
            />
          )}
        </Col>
        <Col span={12} style={{ padding: "0px 20px" }}>
          <h1
            style={{ color: "#34acaf", fontWeight: "bolder", paddingLeft: 10 }}
          >
            Add new brand
          </h1>
          <div className="formAdd">
            <Col span={8}>
              <div className="image">
                <img
                  src={
                    image.length > 0
                      ? image
                      : "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg"
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                    borderColor: "white",
                  }}
                />
                <Upload {...props} showUploadList={false}>
                  <Button className="btn">
                    <FileUploadIcon />
                    Upload Photo
                  </Button>
                </Upload>
              </div>
            </Col>
            <Col span={16} style={{ paddingLeft: 30 }}>
              <Form
                form={form}
                name="form"
                labelCol={{ span: 10 }}
                initialValues={{ remember: true }}
                wrapperCol={{ span: 24 }}
                onFinish={onSubmit}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  name="brand"
                  label={<h3 style={{ color: "#3C3434" }}>BRAND'S NAME</h3>}
                  style={{ fontWeight: "bolder" }}
                >
                  <Input
                    style={{
                      border: "1px solid #D8E5E5",
                      width: "90%",
                      color: "#3C3434",
                      borderRadius: 10,
                      boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                      fontWeight: 700,
                    }}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  form="form"
                  style={{
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#34acaf",
                    width: "90%",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: 10,
                    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                  }}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Datatable;
