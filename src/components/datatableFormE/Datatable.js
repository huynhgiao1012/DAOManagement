import "./style5.scss";
import { DataGrid } from "@mui/x-data-grid";
import { formColumn } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetEmergencyFormMutation,
  useCreateEmergencyFormMutation,
  useGetAllServiceMaMutation,
  useCheckAccountMutation,
  useDeleteFormMutation,
} from "../../services/Manager";
import { Col, Form, Input, Row, Drawer, Popconfirm, Select } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  border: "2px solid #98C4C4",
  boxShadow: 24,
  p: 4,
};
const Datatable = () => {
  const [data, setData] = useState([]);
  const [services, setSer] = useState([]);
  const [listSer, setList] = useState([]);
  const [getAllForm] = useGetEmergencyFormMutation();
  const [getService] = useGetAllServiceMaMutation();
  const [createForm] = useCreateEmergencyFormMutation();
  const [deleteForm] = useDeleteFormMutation();
  const [checkAccount] = useCheckAccountMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [regis, setRegis] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleOpen = (data) => {
    setOpen(true);
    form.setFieldsValue({
      ...data,
    });
  };
  const handleClose = () => {
    setOpen(false);
    setIsModalOpen(false);
    setPrice(0);
    setRegis(false);
    setName("");
    form.resetFields();
  };

  const loadData = () => {
    setData([]);
    getAllForm()
      .unwrap()
      .then((payload) => {
        console.log("payload", payload.orderForm);
        var newArr = [];
        payload.orderForm.map((val, index) => {
          newArr.push({ id: val._id, ...val });
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
    setSer([]);
    setList([]);
    loadData();
    getService()
      .unwrap()
      .then((payload) => {
        const newArr = payload.services.map((val) => {
          const obj = {
            value: val._id,
            label: val.serviceName,
          };
          return obj;
        });
        setSer((prev) => [...prev, ...newArr]);
        setList((prev) => [...prev, ...payload.services]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const cancelConfirm = (e) => {
    console.log(e);
  };
  const handleDelete = async (id) => {
    await deleteForm({ id: id })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          <Alert severity="success">{payload.message}</Alert>;
          loadData();
        }
      });
  };
  // const handleEdit = (id) => {
  //   handleOpen(id);
  //   setIsEdit(true);
  // };
  const handleView = (data) => {
    handleOpen(data);
    setIsEdit(false);
  };
  const handleCreate = () => {
    setIsModalOpen(true);
    setIsEdit(false);
  };
  const onSubmit = async (values) => {
    if (isEdit) {
      // await updateUser({
      //   id: values.Id,
      //   name: values.Name,
      //   phone: values.Phone,
      // })
      //   .unwrap()
      //   .then((payload) => {
      //     if (payload.success === true) {
      //       setOpen(false);
      //       notification.open({
      //         message: "Update profile",
      //         description: "Success",
      //       });
      //       loadData();
      //     } else {
      //       notification.open({
      //         message: "Update profile",
      //         description: "False",
      //       });
      //     }
      //   });
    } else {
      let serPrice = 0;
      let service = "";
      listSer.map((val) => {
        if (val._id === values.service) {
          serPrice = val.estimatedPrice;
          service = val.serviceName;
        }
      });
      await createForm({
        customerName: name.length > 0 ? name : values.customerName,
        phone: values.phone,
        service: service,
        address: values.address === undefined ? "Update" : values.address,
        price: serPrice,
        note: values.note === undefined ? "None" : values.note,
        email: values.email ? values.email : "",
      })
        .unwrap()
        .then((payload) => {
          alert(payload.message);
          setIsModalOpen(false);
          loadData();
        })
        .catch((error) => {
          console.log(error);
          if (error.status === 400) {
            alert(error.data.message.duplicate);
          }
        });
    }
  };
  // const handleChange = (SelectChangeEvent) => {
  //   // settab(SelectChangeEvent.target.value);
  //   // var newArr = [];
  //   // getAllUser()
  //   //   .unwrap()
  //   //   .then((payload) => {
  //   //     if (payload.success === true) {
  //   //       payload.data.map((val) => {
  //   //         newArr.push({
  //   //           id: val._id,
  //   //           username: val.name,
  //   //           img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   //           status: val.isActive ? "active" : "inactive",
  //   //           email: val.email,
  //   //           phone: val.phone,
  //   //           role: val.role,
  //   //           dbId: val._id,
  //   //         });
  //   //       });
  //   //     }
  //   //     if (SelectChangeEvent.target.value === 20) {
  //   //       const arr = newArr.filter((val) => {
  //   //         if (val.role === "customer") {
  //   //           return val;
  //   //         }
  //   //       });
  //   //       setData([]);
  //   //       setData((prev) => [...prev, ...arr]);
  //   //     } else if (SelectChangeEvent.target.value === 30) {
  //   //       const arr = newArr.filter((val) => {
  //   //         if (val.role === "company") {
  //   //           return val;
  //   //         }
  //   //       });
  //   //       setData([]);
  //   //       setData((prev) => [...prev, ...arr]);
  //   //     } else if (SelectChangeEvent.target.value === 40) {
  //   //       const arr = newArr.filter((val) => {
  //   //         if (val.role === "admin") {
  //   //           return val;
  //   //         }
  //   //       });
  //   //       setData([]);
  //   //       setData((prev) => [...prev, ...arr]);
  //   //     } else {
  //   //       setData([]);
  //   //       setData((prev) => [...prev, ...newArr]);
  //   //     }
  //   //   });
  // };
  const actionColumn = [
    {
      field: "isPaid",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.isPaid) {
          return (
            <div
              style={{
                backgroundColor: "#34acaf",
                color: "white",
                borderRadius: 10,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <DoneIcon />
            </div>
          );
        } else {
          return (
            <div
              style={{
                backgroundColor: "#196462",
                color: "white",
                borderRadius: 10,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <ClearIcon />
            </div>
          );
        }
      },
    },
    {
      field: "isFeedback",
      headerName: "Feedback Status",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        if (params.row.isFeedback) {
          return (
            <div
              style={{
                backgroundColor: "#34acaf",
                color: "white",
                borderRadius: 10,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <DoneIcon />
            </div>
          );
        } else {
          return (
            <div
              style={{
                backgroundColor: "#196462",
                color: "white",
                borderRadius: 10,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <ClearIcon />
            </div>
          );
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleView(params.row)}>
              View
            </div>
            <Popconfirm
              title="DELETE ACCOUNT"
              description="Are you sure to delete?"
              onConfirm={() => handleDelete(params.row.id)}
              onCancel={cancelConfirm}
              okText="Yes"
              cancelText="No"
            >
              <div className="deleteButton">Delete</div>
            </Popconfirm>
            {/* <div
              className="editButton"
              onClick={() => handleEdit(params.row._id)}
            >
              Edit
            </div> */}
          </div>
        );
      },
    },
  ];
  const onChange = async (e) => {
    if (e.target.value.length === 10 || e.target.value.length === 11) {
      const obj = { phone: e.target.value };
      await checkAccount({ ...obj })
        .unwrap()
        .then((payload) => {
          setName(payload.data.name);
        })
        .catch((error) => {
          if (error.status === 404) {
            setRegis(true);
            alert(
              error.data.message +
                "!" +
                " " +
                "Please provide email for quick register"
            );
          }
          if (error.status === 401) {
            logOut();
          }
        });
    } else {
      setName("");
    }
  };
  const onSearch = (value) => {
    if (value.length === 0 && data.length === 0) {
      getAllForm()
        .unwrap()
        .then((payload) => {
          setData([]);
          var newArr = [];
          payload.orderForm.map((val, index) => {
            newArr.push({ id: val._id, ...val });
          });
          setData((prev) => [...prev, ...newArr]);
        })
        .catch((error) => {
          if (error.status === 401) {
            logOut();
          }
        });
    } else {
      getAllForm()
        .unwrap()
        .then((payload) => {
          setData([]);
          var newArr = [];
          payload.orderForm.map((val, index) => {
            if (val.phone.includes(value)) {
              newArr.push({ id: val._id, ...val });
            }
          });
          setData((prev) => [...prev, ...newArr]);
        })
        .catch((error) => {
          if (error.status === 401) {
            logOut();
          }
        });
    }
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h5 style={{ color: "#196462", fontWeight: "bold" }}>
          List of emergency form (in processing)
        </h5>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="addButton" onClick={handleCreate}>
            <p
              style={{
                fontSize: 16,
                color: "white",
                height: 15,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Create Emergency Form
            </p>
          </div>
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="search-input"
            placeholder="Search by phone"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={formColumn.concat(actionColumn)}
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
      <div>
        <Modal open={isModalOpen} onClose={handleClose} style={{ zIndex: 10 }}>
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
              CREATE EMERGENCY FORM
            </Typography>
            <Form
              form={form}
              name="form"
              labelCol={{ span: 18 }}
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              autoComplete="off"
              layout="vertical"
              style={{ marginLeft: 30, color: "#3C3434" }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter phone",
                        type: "string",
                      },
                      { whitespace: false, min: 10, max: 12 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                      onChange={onChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {!regis ? (
                    <Form.Item
                      label="Customer Name"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Please enter name",
                          type: "string",
                        },
                        { whitespace: true },
                        { min: 3 },
                      ]}
                      hasFeedback
                    >
                      <Input
                        style={{ border: "1px solid #98C4C4", width: 220 }}
                        type="string"
                        value={name}
                      />
                      {console.log(name)}
                    </Form.Item>
                  ) : (
                    <Form.Item
                      name="customerName"
                      label="Customer Name"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Please enter name",
                          type: "string",
                        },
                        { whitespace: true },
                        { min: 3 },
                      ]}
                      hasFeedback
                    >
                      <Input
                        style={{ border: "1px solid #98C4C4", width: 220 }}
                        type="string"
                      />
                    </Form.Item>
                  )}
                </Col>
              </Row>
              {regis && (
                <Row>
                  <Form.Item
                    name="email"
                    label="Email"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter email",
                        type: "email",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 480 }}
                      type="string"
                    />
                  </Form.Item>
                </Row>
              )}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Service"
                    name="service"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please choose service",
                        type: "string",
                      },
                    ]}
                    hasFeedback
                  >
                    <Select
                      defaultValue="None"
                      style={{
                        width: 220,
                      }}
                      onChange={(value) => {
                        listSer.map((val) => {
                          if (val._id === value) {
                            setPrice(val.estimatedPrice);
                          }
                        });
                      }}
                      options={services}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                      {
                        message: "Please enter address",
                        type: "string",
                      },
                      { min: 6 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Price" hasFeedback>
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                      value={price}
                    />
                    {console.log(price)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="note"
                    label="Note"
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10, max: 400 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    form="form"
                    style={{
                      width: "90%",
                      textAlign: "center",
                      backgroundColor: "#34acaf",
                      color: "white",
                    }}
                  >
                    Submit
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    onClick={handleClose}
                    style={{
                      width: "90%",
                      textAlign: "center",
                      backgroundColor: "#98C4C4",
                      color: "white",
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Box>
        </Modal>
      </div>
      <Drawer width={500} onClose={handleClose} open={open}>
        <p style={{ fontSize: "25px", color: "#34acaf", fontWeight: "bold" }}>
          Form's Detail
        </p>
        <Form
          form={form}
          name="form"
          labelCol={{ span: 18 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="id"
                label={<h3 style={{ color: "#34acaf" }}>ID</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mechanicId"
                label={<h3 style={{ color: "#34acaf" }}>Mechanic's ID</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customerName"
                label={<h3 style={{ color: "#34acaf" }}>Customer's Name</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label={<h3 style={{ color: "#34acaf" }}>Phone</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="service"
                label={<h3 style={{ color: "#34acaf" }}>Service</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label={<h3 style={{ color: "#34acaf" }}>Price</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                  readOnly={true}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label={<h3 style={{ color: "#34acaf" }}>Date</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label={<h3 style={{ color: "#34acaf" }}>Time</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="isPaid"
                label={<h3 style={{ color: "#34acaf" }}>Paid Status</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isFeedback"
                label={<h3 style={{ color: "#34acaf" }}>Feedback Status</h3>}
              >
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: 220,
                    color: "#3C3434",
                    fontWeight: "600",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* {isEdit && (
            <Row gutter={16}>
              <Button
                type="primary"
                htmlType="submit"
                form="form"
                style={{
                  width: "100%",
                  backgroundColor: "#98C4C4",
                  color: "white",
                }}
              >
                Submit
              </Button>
            </Row>
          )} */}
        </Form>
      </Drawer>
    </div>
  );
};

export default Datatable;
