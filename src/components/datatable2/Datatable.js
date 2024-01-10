import "./datatable2.scss";
import { DataGrid } from "@mui/x-data-grid";
import { garageColumn, banksData } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Col,
  Form,
  Input,
  Row,
  Drawer,
  Popconfirm,
  Skeleton,
  Select,
} from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  useGetAllGarageMutation,
  useUpdateGarageMutation,
  useCreateGarageMutation,
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
  const [getAllGarage, { isLoading }] = useGetAllGarageMutation();
  const [updateGarage] = useUpdateGarageMutation();
  const [createGarage] = useCreateGarageMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleOpen = (data) => {
    setOpen(true);
    form.setFieldsValue({
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      openTime: data.openTime,
      closeTime: data.closeTime,
      description: data.description,
      bank: data.bank,
      num: data.num,
      accName: data.accName,
    });
  };
  const handleClose = () => {
    setOpen(false);
    setIsModalOpen(false);
    form.resetFields();
  };

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
    loadData();
  }, []);
  const cancelConfirm = (e) => {
    console.log(e);
  };
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
  const handleEdit = (data) => {
    setIsEdit(true);
    handleOpen(data);
  };
  const handleView = (data) => {
    handleOpen(data);
    setIsEdit(false);
  };
  const handleCreate = () => {
    setIsModalOpen(true);
    setOpen(false);
    setIsEdit(false);
  };
  const onSubmit = async (value) => {
    let bankNum = "";
    banksData.forEach((val) => {
      if (value.bank === val.value) {
        bankNum = val.label;
      }
    });
    const obj = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      openTime: value.openTime,
      closeTime: value.closeTime,
      longitude: value.longitude,
      latitude: value.latitude,
      address: value.address,
      description: value.description,
      transferInfo: [
        {
          bank: bankNum,
          name: value.accName,
          num: value.num,
        },
      ],
    };
    if (isEdit) {
      await updateGarage({
        id: value.id,
        ...obj,
      })
        .unwrap()
        .then((payload) => {
          if (payload.success === true) {
            setOpen(false);
            alert(payload.message);
            loadData();
          }
        })
        .catch((error) => {
          if (error.status === 401) {
            logOut();
          }
        });
    } else {
      await createGarage({ ...obj })
        .unwrap()
        .then((payload) => {
          if (payload.success === true) {
            setOpen(false);
            alert(payload.message);
            handleClose();
            loadData();
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.status === 401) {
            logOut();
          }
        });
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Garage Action",
      width: 250,
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
            <div className="activeBtn" onClick={() => handleEdit(params.row)}>
              Edit
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <button
          onClick={handleCreate}
          style={{
            backgroundColor: "#34acaf",
            border: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            padding: "5px 20px",
            borderRadius: 10,
          }}
        >
          Create Garage
        </button>
      </div>
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
          rows={data}
          columns={garageColumn.concat(actionColumn)}
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
      )}
      {/* modal to create garage */}
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
              ADD NEW GARAGE
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
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="longitude"
                    label="Longitude"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "double",
                      },
                    ]}
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
                <Col span={8}>
                  <Form.Item
                    name="latitude"
                    label="Latitude"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "double",
                      },
                    ]}
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
                <Col span={8}>
                  <Form.Item
                    name="openTime"
                    label="Open Time"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "string",
                      },
                    ]}
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
                <Col span={8}>
                  <Form.Item
                    name="closeTime"
                    label="Close Time"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "string",
                      },
                    ]}
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
                <Col span={8}>
                  <Form.Item
                    name="address"
                    label="Address"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10 },
                    ]}
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
                <Col span={8}>
                  <Form.Item
                    name="bank"
                    label="Bank"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "string",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{
                        width: "100%",
                        zIndex: 1,
                      }}
                      placeholder="Select bank"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={banksData}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="num"
                    label="Card Number"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 10, max: 19 },
                    ]}
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
                <Col span={8}>
                  <Form.Item
                    name="accName"
                    label="Account Holder"
                    style={{ fontWeight: "bolder" }}
                    required
                    rules={[
                      {
                        type: "string",
                      },
                      { min: 5 },
                    ]}
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
                <Col span={8}>
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
              </Row>
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
            </Form>
          </Box>
        </Modal>
      </div>
      {/* view + edit garage */}
      <Drawer
        title={"GARAGE DETAIL"}
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
              <Form.Item name="id" label="ID" style={{ fontWeight: "bolder" }}>
                <Input
                  style={{
                    border: "1px solid #D8E5E5",
                    width: "100%",
                    color: "#3C3434",
                  }}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
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
            </Col>
            <Col span={12}>
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
                {isEdit ? (
                  <Select
                    showSearch
                    style={{
                      width: "100%",
                      zIndex: 1,
                    }}
                    placeholder="Select bank"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={banksData}
                  />
                ) : (
                  <Input
                    style={{
                      border: "1px solid #D8E5E5",
                      width: "100%",
                      color: "#3C3434",
                    }}
                  />
                )}
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
            <Col span={12}></Col>
            <Col span={12}>
              <Form.Item
                name="accName"
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
          </Row>
          {isEdit && (
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
      </Drawer>
    </div>
  );
};

export default Datatable;
