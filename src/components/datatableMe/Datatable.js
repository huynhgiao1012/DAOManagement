import "./style11.scss";
import { DataGrid } from "@mui/x-data-grid";
import { mechanicColumns } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetAllMechanicMutation,
  useCreateMechanicAccountMutation,
  useDeleteMechanicMutation,
} from "../../services/Manager";
import { Col, Form, Input, Row, Drawer, Popconfirm, Radio } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
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
const { Search } = Input;
const Datatable = () => {
  const [data, setData] = useState([]);
  const [getAllMechanic] = useGetAllMechanicMutation();
  const [createMechanicAccount] = useCreateMechanicAccountMutation();
  const [deleteMechanic] = useDeleteMechanicMutation();
  const [isEdit, setIsEdit] = useState(false);
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
      Id: data.id,
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Status: data.status,
      Group: data.group,
      Point: data.point,
    });
  };
  const handleClose = () => setOpen(false);

  const loadData = () => {
    setData([]);
    getAllMechanic()
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.mechanic.map((val, index) => {
          newArr.push({
            id: val._id,
            name: val.accountId.name,
            img: val.accountId.img,
            status: val.isAvailable ? "available" : "unavailable",
            email: val.accountId.email,
            phone: val.accountId.phone,
            point: val.mePoint,
            group: val.group,
          });
        });
        console.log(newArr);
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
    await deleteMechanic({ id: id })
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
    console.log(values);
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
      await createMechanicAccount({
        name: values.Name,
        email: values.Email,
        phone: values.Phone,
        group: values.Group,
      })
        .unwrap()
        .then((payload) => {
          alert(payload.message);
          setIsModalOpen(false);
          loadData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const onSearch = (value) => {
    if (value.length === 0 && data.length === 0) {
      getAllMechanic()
        .unwrap()
        .then((payload) => {
          setData([]);
          var newArr = [];
          payload.mechanic.map((val, index) => {
            newArr.push({
              id: val._id,
              name: val.accountId.name,
              img: val.accountId.img,
              status: val.isAvailable ? "available" : "unavailable",
              email: val.accountId.email,
              phone: val.accountId.phone,
              point: val.mePoint,
              group: val.group,
            });
          });
          setData((prev) => [...prev, ...newArr]);
        })
        .catch((error) => {
          if (error.status === 401) {
            logOut();
          }
        });
    } else {
      getAllMechanic()
        .unwrap()
        .then((payload) => {
          setData([]);
          var newArr = [];
          payload.mechanic.map((val, index) => {
            if (
              val.accountId.name.toUpperCase().includes(value.toUpperCase())
            ) {
              newArr.push({
                id: val._id,
                name: val.accountId.name,
                img: val.accountId.img,
                status: val.isAvailable ? "available" : "unavailable",
                email: val.accountId.email,
                phone: val.accountId.phone,
                point: val.mePoint,
                group: val.group,
              });
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
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="mechanicAction">
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
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div className="addButton" onClick={handleCreate}>
          <p
            style={{
              fontSize: 16,
              color: "white",
              width: 160,
              height: 15,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Add new mechanic
          </p>
        </div>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Search by name"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={mechanicColumns.concat(actionColumn)}
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
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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
              ADD NEW MECHANIC
            </Typography>
            <Form
              form={form}
              name="form"
              labelCol={{ span: 8 }}
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
                    name="Name"
                    label="Name"
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
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Email"
                    label="Email"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter email",
                        type: "email",
                      },
                      { whitespace: false },
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
                  <Form.Item
                    name="Phone"
                    label="Phone"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter phone",
                        type: "string",
                      },
                      { whitespace: false },
                      { min: 10, max: 12 },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Group"
                    label="Group"
                    rules={[
                      {
                        required: true,
                        message: "Please choose group",
                        type: "string",
                      },
                      { whitespace: true },
                      { min: 3 },
                    ]}
                    hasFeedback
                  >
                    <Radio.Group style={{ display: "flex" }}>
                      <Radio value="emergency">Emergency</Radio>
                      <Radio value="maintenance">Maintanence</Radio>
                    </Radio.Group>
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
                    onClick={() => setIsModalOpen(false)}
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
        <p style={{ fontSize: "30px", color: "#34acaf", fontWeight: "bold" }}>
          User's Detail
        </p>
        <Form
          form={form}
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Id"
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
                name="Group"
                label={<h3 style={{ color: "#34acaf" }}>Group</h3>}
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
                name="Name"
                label={<h3 style={{ color: "#34acaf" }}>Name</h3>}
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
                name="Email"
                label={<h3 style={{ color: "#34acaf" }}>Email</h3>}
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
                name="Phone"
                label={<h3 style={{ color: "#34acaf" }}>Phone</h3>}
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
                name="Status"
                label={<h3 style={{ color: "#34acaf" }}>Status</h3>}
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
                name="Point"
                label={<h3 style={{ color: "#34acaf" }}>Point</h3>}
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
