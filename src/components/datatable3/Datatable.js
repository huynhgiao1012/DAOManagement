import "./datatable3.scss";
import { DataGrid } from "@mui/x-data-grid";
import { garageColumn2, banksData, managerColumn } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Form, Input, Row, Drawer, Skeleton, Select } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  useGetAllGarageMutation,
  useCreateManagerAccountMutation,
  useGetAllManagerMutation,
} from "../../services/Garage";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "white",
  border: "2px solid #98C4C4",
  boxShadow: 24,
  p: 4,
  zIndex: 10,
};
const Datatable = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [getAllGarage, { isLoading }] = useGetAllGarageMutation();
  const [getAllManager] = useGetAllManagerMutation();
  const [createManagerAccount] = useCreateManagerAccountMutation();
  const [isCreate, setIsCreate] = useState(false);
  const [show, setShow] = useState(false);
  const [garaId, setGaraId] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  // open modal
  const handleOpen = (data) => {
    setIsModalOpen(true);
    form.setFieldsValue({
      id: data.Id,
      name: data.Name,
      img: data.Img,
      email: data.Email,
      phone: data.Phone,
    });
  };
  // close modal
  const handleClose = () => {
    setIsModalOpen(false);
    form.resetFields();
    setIsCreate(false);
    setShow(false);
  };
  // load all garages
  const loadData = () => {
    setData([]);
    getAllGarage()
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.data.map((val) => {
          newArr.push({
            id: val._id,
            name: val.name,
            email: val.email,
            phone: val.phone,
            address: val.address,
            latitude: val.latitude,
            longitude: val.longitude,
            openTime: val.openTime,
            closeTime: val.closeTime,
            description: val.description,
            bank: val.transferInfo[0].bank,
            num: val.transferInfo[0].num,
            accName: val.transferInfo[0].name,
          });
        });
        setData((prev) => [...prev, ...newArr]);
      })
      .catch((error) => {
        if (error.status === 401) {
          logOut();
        }
      });
  };
  useEffect(() => {
    setData([]);
    setData2([]);
    setShow(false);
    loadData();
  }, []);
  // delete manager
  const handleDelete = async (id) => {
    // await deleteMechanic({ id: id })
    //   .unwrap()
    //   .then((payload) => {
    //     if (payload.success) {
    //       <Alert severity="success">{payload.message}</Alert>;
    //       loadData();
    //     }
    //   });
  };
  // click add manager account
  const handleAdd = (id) => {
    setGaraId(id);
    setIsCreate(true);
    setIsModalOpen(true);
    form.resetFields();
  };
  // view list of manager
  const handleView = (data) => {
    setData2([]);
    getAllManager({ id: data.id })
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.data.map((val, index) => {
          newArr.push({
            Id: val._id,
            Name: val.accountId.name,
            Img: val.accountId.img,
            Email: val.accountId.email,
            Phone: val.accountId.phone,
            id: index,
          });
        });
        setData2((prev) => [...prev, ...newArr]);
      })
      .catch((error) => {
        if (error.status === 401) {
          logOut();
        }
      });
    setShow(true);
  };
  // view manager detail
  const handleViewDetail = (data) => {
    handleOpen(data);
    setIsCreate(false);
  };
  // submit to create manager account
  const onSubmit = async (value) => {
    const obj = {
      name: value.name,
      phone: value.phone,
      email: value.email,
    };
    await createManagerAccount({ id: garaId, ...obj })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          alert(payload.message);
          handleClose();
          loadData();
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          logOut();
        } else if (error.status === 400) {
          alert(error.data.message.duplicate);
        }
      });
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Garage Action",
      width: 300,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleView(params.row)}>
              View Manager
            </div>
            <div className="activeBtn" onClick={() => handleAdd(params.row.id)}>
              Add Manager
            </div>
          </div>
        );
      },
    },
  ];
  const actionColumn2 = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleViewDetail(params.row)}
            >
              View
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      {isLoading ? (
        <div style={{ margin: 20 }}>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <Row gutter={16}>
          <Col span={11}>
            <DataGrid
              className="datagrid"
              rows={data}
              columns={garageColumn2.concat(actionColumn)}
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
          </Col>
          {show && (
            <Col span={13}>
              <DataGrid
                className="datagrid"
                rows={data2}
                columns={managerColumn.concat(actionColumn2)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                disableVirtualization
                rowSelection={false}
                sx={{
                  boxShadow: 2,
                  border: 2,
                  borderColor: "white",
                  height: "100%",
                  width: "100%",
                }}
              />
            </Col>
          )}
        </Row>
      )}
      {/* modal to create manager */}
      <div>
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ zIndex: 10 }}
        >
          <Box sx={style}>
            <Typography
              style={{
                textAlign: "center",
                color: "#3C3434",
                fontWeight: "bold",
                marginBottom: 20,
                fontSize: 22,
              }}
            >
              {isCreate ? "ADD MANAGER ACCOUNT" : "MANAGER'S DETAIL"}
            </Typography>
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
                <Col span={8}>
                  <Form.Item
                    name="name"
                    label="Name"
                    required
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 5 },
                    ]}
                    style={{ fontWeight: "bolder" }}
                  >
                    <Input
                      style={{
                        border: "1px solid #D8E5E5",
                        width: "100%",
                        color: "#3C3434",
                      }}
                      readOnly={isCreate ? false : true}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="email"
                    label="Email"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "email",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        border: "1px solid #D8E5E5",
                        width: "100%",
                        color: "#3C3434",
                      }}
                      readOnly={isCreate ? false : true}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10, max: 12 },
                    ]}
                  >
                    <Input
                      style={{
                        border: "1px solid #D8E5E5",
                        width: "100%",
                        color: "#3C3434",
                      }}
                      readOnly={isCreate ? false : true}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {isCreate && (
                <Row>
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
                </Row>
              )}
            </Form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Datatable;
