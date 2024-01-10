import "./list.scss";
import Sidebar from "../../../components/sidebarMa/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Col, Form, Input, Row, Card, Button, Drawer, Upload } from "antd";
import {
  useGetGarageDetailMutation,
  useGetAllEmployeeMutation,
  useGetAllFormMutation,
  useGetAllServiceMaMutation,
  useUpdateGarageMutation,
} from "../../../services/Manager";
import Text from "../../../components/text";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IP } from "../../../Utils/constants";
import { Carousel, Skeleton } from "antd";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
};
const GarageDetails = ({ socket }) => {
  const navigate = useNavigate();
  const [getGarageDetail, { isLoading }] = useGetGarageDetailMutation();
  const [form] = Form.useForm();
  const [getAllEmployee] = useGetAllEmployeeMutation();
  const [getAllSer] = useGetAllServiceMaMutation();
  const [getAllForm] = useGetAllFormMutation();
  const [updateGarage] = useUpdateGarageMutation();
  const [totalEm, setEm] = useState([]);
  const [totalForm, setForm] = useState([]);
  const [totalSer, setSer] = useState([]);
  const [totalRe, setRe] = useState(0);
  const [open, setOpen] = useState(false);
  const [listImg, setList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [img64, setimg] = useState("");
  const [data, setData] = useState({
    _id: "",
    address: "",
    closeTime: "",
    description: "",
    email: "",
    img: [],
    latitude: 0,
    longitude: 0,
    name: "",
    openTime: "",
    phone: "",
    transferInfo: [],
  });
  useEffect(() => {
    setEm([]);
    setForm([]);
    setSer([]);
    setRe(0);
    getGarageDetail()
      .unwrap()
      .then((payload) => {
        setData((prev) => ({ ...prev, ...payload.garage }));
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          localStorage.clear();
          navigate("/login");
        }
      });
    getAllEmployee()
      .unwrap()
      .then((payload) => {
        setEm((prev) => [...prev, ...payload.data]);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllForm()
      .unwrap()
      .then((payload) => {
        setForm((prev) => [...prev, ...payload.orderForm]);
        let price = 0;
        payload.orderForm.map((val) => {
          if (val.isPaid) {
            price = price + val.price;
          }
        });
        setRe(price);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllSer()
      .unwrap()
      .then((payload) => {
        setSer((prev) => [...prev, ...payload.services]);
      })
      .catch((error) => {
        console.log(error);
      });
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
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setimg("");
    setList([]);
  };
  const onSubmit = async (value) => {
    const arr = await Promise.all(
      listImg.map(async (val) => {
        const base64 = await convertToBase64(val.originFileObj);
        return base64;
      })
    );
    const obj = {
      name: value.name,
      phone: value.phone,
      openTime: value.openTime,
      closeTime: value.closeTime,
      longitude: value.longitude,
      latitude: value.latitude,
      img: arr,
      address: value.address,
      description: value.description,
      transferInfo: [
        {
          bank: value.bank,
          name: value.cardName,
          num: value.num,
        },
      ],
    };
    await updateGarage({ ...obj })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          alert(payload.message);
          setOpen(false);
          getGarageDetail()
            .unwrap()
            .then((payload) => {
              setData((prev) => ({ ...prev, ...payload.garage }));
            })
            .catch((error) => {
              if (error.data.message === "Token is exprired") {
                localStorage.clear();
                navigate("/login");
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.data.message === "Token is exprired") {
          localStorage.clear();
          navigate("/login");
        }
      });
  };
  const handleOpen = () => {
    setOpen(true);
    setList([]);
    form.setFieldsValue({
      id: data._id,
      name: data.name,
      address: data.address,
      closeTime: data.closeTime,
      description: data.description,
      email: data.email,
      latitude: data.latitude,
      longitude: data.longitude,
      openTime: data.openTime,
      phone: data.phone,
      bank: data.transferInfo[0].bank,
      cardName: data.transferInfo[0].name,
      num: data.transferInfo[0].num,
    });
  };
  const handleChange = ({ fileList: newFileList }) => setList(newFileList);
  const uploadButton = (
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  );
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar socket={socket} />
        {isLoading ? (
          <div style={{ margin: 20 }}>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <Row style={{ marginBottom: 20 }}>
            <Col span={12}>
              <Row style={{ margin: 20 }}>
                <Button
                  onClick={handleOpen}
                  style={{
                    backgroundColor: "#34acaf",
                    border: "None",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Update detail
                </Button>
              </Row>
              <Row style={{ margin: 20 }}>
                <Col span={12}>
                  <Text data={{ key: "Garage's Name", value: data.name }} />
                  <Text data={{ key: "Phone", value: data.phone }} />
                  <Text data={{ key: "Email", value: data.email }} />
                  <Text data={{ key: "Address", value: data.address }} />
                  <div style={{ width: "90%" }}>
                    <h3 style={{ color: "#34acaf" }}>
                      Transfering Information
                    </h3>
                    <p
                      style={{
                        backgroundColor: "#f8f8f8",
                        padding: 10,
                        color: "#3C3434",
                        borderRadius: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {data.transferInfo.length === 1
                        ? data.transferInfo[0].bank
                        : ""}
                      <br />
                      {data.transferInfo.length === 1
                        ? data.transferInfo[0].num
                        : ""}
                      <br />
                      {data.transferInfo.length === 1
                        ? data.transferInfo[0].name
                        : ""}
                    </p>
                  </div>
                </Col>
                <Col span={12}>
                  <Row
                    style={{
                      color: "black",
                      fontStyle: "italic",
                      margin: "10px 0px",
                      backgroundColor: "#f8f8f8",
                      width: "90%",
                      padding: 10,
                    }}
                  >
                    ID: {data._id}
                  </Row>
                  <Text data={{ key: "Longitude", value: data.longitude }} />
                  <Text data={{ key: "Latitude", value: data.latitude }} />
                  <Text
                    data={{
                      key: "Time",
                      value: data.openTime + " " + "-" + " " + data.closeTime,
                    }}
                  />
                  <div style={{ width: "90%" }}>
                    <h3 style={{ color: "#34acaf" }}>Description</h3>
                    <Input.TextArea
                      value={data.description}
                      autoSize={{
                        minRows: 2,
                        maxRows: 6,
                      }}
                      readOnly
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={11}>
              <div
                style={{
                  color: "#3C3434",
                  marginTop: 20,
                  borderLeft: "1px solid #D8E5E5",
                  paddingLeft: 20,
                }}
              >
                <Carousel
                  autoplay
                  style={{ width: 580, margin: "10px 0px", height: 280 }}
                >
                  {data.img.map((val, index) => {
                    return (
                      <img src={val} width="100%" height={280} key={index} />
                    );
                  })}
                </Carousel>
                <h1>Statistics</h1>
                <Row gutter={16} style={{ marginBottom: 10 }}>
                  <Col span={12}>
                    <Card
                      title="TOTAL STAFF"
                      bordered={true}
                      style={{ border: "1px solid #98C4C4" }}
                      headStyle={{
                        borderBottom: "1px dashed #98C4C4",
                        color: "#34acaf",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      bodyStyle={{
                        fontSize: 24,
                        fontWeight: "bolder",
                        padding: "10px 20px",
                        textAlign: "center",
                      }}
                    >
                      {totalEm.length}
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      title="TOTAL FORM"
                      bordered={true}
                      style={{ border: "1px solid #98C4C4" }}
                      headStyle={{
                        borderBottom: "1px dashed #98C4C4",
                        color: "#34acaf",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      bodyStyle={{
                        fontSize: 24,
                        fontWeight: "bolder",
                        padding: "10px 20px",
                        textAlign: "center",
                      }}
                    >
                      {totalForm.length}
                    </Card>
                  </Col>
                </Row>
                <Row></Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card
                      title="TOTAL SERVICE"
                      bordered={true}
                      style={{ border: "1px solid #98C4C4" }}
                      headStyle={{
                        borderBottom: "1px dashed #98C4C4",
                        color: "#34acaf",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      bodyStyle={{
                        fontSize: 24,
                        fontWeight: "bolder",
                        padding: "10px 20px",
                        textAlign: "center",
                      }}
                    >
                      {totalSer.length}
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      title="TOTAL REVENUE"
                      bordered={true}
                      style={{ border: "1px solid #98C4C4" }}
                      headStyle={{
                        borderBottom: "1px dashed #98C4C4",
                        color: "#34acaf",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      bodyStyle={{
                        fontSize: 24,
                        fontWeight: "bolder",
                        padding: "10px 20px",
                        textAlign: "center",
                      }}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalRe)}
                    </Card>
                  </Col>
                </Row>
                <Row></Row>
              </div>
            </Col>
          </Row>
        )}
      </div>
      <Drawer
        title={"UPDATE DETAIL"}
        width={700}
        onClose={handleClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form
          form={form}
          name="form"
          labelCol={{ span: 18 }}
          initialValues={{ remember: true }}
          wrapperCol={{ span: 24 }}
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <div
                style={{
                  width: "100%",
                  padding: 20,
                  backgroundColor: "#f8f8f8",
                  borderRadius: 10,
                }}
              >
                <Upload
                  {...props}
                  listType="picture-card"
                  fileList={listImg}
                  onChange={handleChange}
                >
                  {listImg.length >= 2 ? null : uploadButton}
                </Upload>
              </div>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                style={{ fontWeight: "bolder" }}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                style={{ fontWeight: "bolder" }}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Description"
                style={{ fontWeight: "bolder" }}
              >
                <Input.TextArea
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                  autoSize={{
                    minRows: 2,
                    maxRows: 3,
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                style={{ fontWeight: "bolder" }}
              >
                <Input.TextArea
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                  autoSize={{
                    minRows: 2,
                    maxRows: 4,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="longitude"
                label="Longitude"
                style={{ fontWeight: "bolder" }}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="latitude"
                label="Latitude"
                style={{ fontWeight: "bolder" }}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="openTime"
                label="Open Time"
                style={{ fontWeight: "bolder" }}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="closeTime"
                label="Close Time"
                style={{ fontWeight: "bolder" }}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="bank"
                label="Bank"
                style={{ fontWeight: "bolder" }}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="num"
                label="Card Number"
                style={{ fontWeight: "bolder" }}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cardName"
                label="Account Holder"
                style={{ fontWeight: "bolder" }}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                htmlType="submit"
                form="form"
                style={{
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "#34acaf",
                  width: "100%",
                  fontWeight: "bold",
                  border: "none",
                  marginTop: 20,
                  height: 40,
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default GarageDetails;
