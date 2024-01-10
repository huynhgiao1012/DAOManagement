import "./profile.scss";
import Sidebar from "../../../components/sidebarAcc/Sidebar";
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

const MyProfile = () => {
  const navigate = useNavigate();
  const [getUserDetail, { isLoading }] = useGetUserDetailMutation();
  const [updateInfo] = useUpdateInfoMutation();
  const [form] = Form.useForm();
  const [image, setImage] = useState("");
  const [isUpdate, setUpdate] = useState(false);
  const [data, setData] = useState({
    _id: "",
    email: "",
    isActive: false,
    name: "",
    phone: "",
    role: "",
    img: "",
  });
  const loadData = () => {
    getUserDetail()
      .unwrap()
      .then((payload) => {
        setData((prev) => ({ ...prev, ...payload.data }));
        form.setFieldsValue({
          name: payload.data.name,
          phone: payload.data.phone,
          email: payload.data.email,
          role: payload.data.role,
        });
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          logOut();
        }
      });
  };
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
  useEffect(() => {
    loadData();
    setImage("");
    setUpdate(false);
  }, []);
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
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const onSubmit = async (value) => {
    await updateInfo({
      name: value.name,
      phone: value.phone,
      img: image.length > 0 ? image : data.img,
    })
      .then((payload) => {
        if (payload.data.success) {
          alert(payload.data.message);
          loadData();
          setUpdate(false);
        }
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          logOut();
        }
      });
  };
  const handleUpdate = () => {
    setUpdate(true);
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {isLoading ? (
          <div style={{ margin: 20 }}>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <div className="content">
            <div className="head">
              <div className="left">
                <AccountCircleIcon style={{ color: "#34acaf" }} />
                <h3>My Profile</h3>
              </div>
              <Button className="right" onClick={handleUpdate}>
                UPDATE
              </Button>
            </div>
            <Row
              style={{
                margin: "20px 0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Col span={12} className="colLeft">
                <div className="image">
                  <img
                    src={image.length > 0 ? image : data.img}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                {isUpdate && (
                  <Upload {...props} showUploadList={false}>
                    <Button>
                      <FileUploadIcon />
                      Upload Photo
                    </Button>
                  </Upload>
                )}
              </Col>
              <Col span={12}>
                <Form
                  form={form}
                  name="form"
                  labelCol={{ span: 18 }}
                  initialValues={{ remember: true }}
                  wrapperCol={{ span: 24 }}
                  onFinish={onSubmit}
                  autoComplete="off"
                  layout="vertical"
                  style={{ padding: 20 }}
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label={<h3 style={{ color: "#34acaf" }}>NAME</h3>}
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
                          readOnly={!isUpdate}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        label={<h3 style={{ color: "#34acaf" }}>PHONE</h3>}
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
                          readOnly={!isUpdate}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label={<h3 style={{ color: "#34acaf" }}>EMAIL</h3>}
                        style={{ fontWeight: "bolder", color: "#34acaf" }}
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
                          readOnly
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="role"
                        label={<h3 style={{ color: "#34acaf" }}>ROLE</h3>}
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
                          readOnly
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {isUpdate && (
                    <Row>
                      <Button
                        type="primary"
                        htmlType="submit"
                        form="form"
                        style={{
                          textAlign: "center",
                          color: "white",
                          backgroundColor: "#34acaf",
                          width: "95%",
                          fontWeight: "bold",
                          border: "none",
                          marginTop: 20,
                          borderRadius: 10,
                          boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                        }}
                      >
                        Submit
                      </Button>
                    </Row>
                  )}
                </Form>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
