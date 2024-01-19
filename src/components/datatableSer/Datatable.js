import "./style3.scss";
import { DataGrid } from "@mui/x-data-grid";
import { serviceColumns, serviceColumns2 } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetAllServiceMaMutation,
  useGetSubServiceMutation,
  useCreateServiceMutation,
  useCreateSubServiceMutation,
  useUpdateServiceMutation,
  useUpdateSubServiceMutation,
} from "../../services/Manager";
import { Col, Form, Input, Row, Drawer, Popconfirm, Radio } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import { useCreateCompanyMutation } from "../../services/Company";
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
  const [subData, setSubData] = useState([]);
  const [serId, setSerId] = useState("");
  const [getAllService] = useGetAllServiceMaMutation();
  const [getSubService] = useGetSubServiceMutation();
  const [createService] = useCreateServiceMutation();
  const [createSubService] = useCreateSubServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [updateSubService] = useUpdateSubServiceMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [isViewSub, setViewSub] = useState(false);
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
      Price: data.price,
    });
  };
  const handleClose = () => setOpen(false);

  const loadData = () => {
    setData([]);
    getAllService()
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.services.map((val, index) => {
          newArr.push({
            id: val._id,
            name: val.serviceName,
            price: val.estimatedPrice,
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
  const loadData2 = (id) => {
    setSubData([]);
    getSubService({ id })
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.subServices.map((val, index) => {
          newArr.push({
            id: val._id,
            name: val.subName,
            price: val.subPrice,
          });
        });
        setSubData((prev) => [...prev, ...newArr]);
      })
      .catch((error) => {
        return error;
      });
  };
  useEffect(() => {
    setData([]);
    setSubData([]);
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
  const handleDeleteSub = (id) => {};
  const handleEdit = (id) => {
    handleOpen(id);
    setIsEdit(true);
  };
  const handleView = (data) => {
    handleOpen(data);
    setIsEdit(false);
  };
  const handleCreate = () => {
    setIsModalOpen(true);
    setIsEdit(false);
    form.resetFields();
  };
  const onSubmit = async (values) => {
    console.log(values);
    if (isEdit) {
      if (isViewSub) {
        await updateSubService({
          id: values.Id,
          name: values.Name,
          price: Number(values.Price),
        })
          .unwrap()
          .then((payload) => {
            if (payload.success === true) {
              alert(payload.message);
              setOpen(false);
              setIsEdit(false);
              setViewSub(false);
              loadData();
            } else {
              alert("Update failed");
            }
          });
      } else {
        await updateService({
          id: values.Id,
          name: values.Name,
          price: Number(values.Price),
        })
          .unwrap()
          .then((payload) => {
            if (payload.success === true) {
              setOpen(false);
              setIsEdit(false);
              alert(payload.message);
              loadData();
            } else {
              alert("Update failed");
            }
          });
      }
    } else if (isViewSub) {
      const obj = {
        subName: values.Name,
        subPrice: values.Price,
      };
      await createSubService({ id: serId, ...obj })
        .unwrap()
        .then((payload) => {
          alert(payload.message);
          setIsModalOpen(false);
          setViewSub(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await createService({
        serviceName: values.Name,
        estimatedPrice: values.Price,
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
  const handleViewSub = (id) => {
    setSubData([]);
    getSubService({ id })
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.subServices.map((val, index) => {
          newArr.push({
            id: val._id,
            name: val.subName,
            price: val.subPrice,
          });
        });
        setSubData((prev) => [...prev, ...newArr]);
      })
      .catch((error) => {
        return error;
      });
  };
  const handleAddSub = (id) => {
    setIsModalOpen(true);
    setIsEdit(false);
    form.resetFields();
    setViewSub(true);
    setSerId(id);
  };
  const handleEditSub = (id) => {
    handleOpen(id);
    setIsEdit(true);
    setViewSub(true);
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="action">
            <div className="viewButton" onClick={() => handleView(params.row)}>
              <CalendarViewMonthIcon
                fontSize="small"
                style={{ paddingTop: 5 }}
              />
            </div>
            <div className="editButton" onClick={() => handleEdit(params.row)}>
              <EditIcon fontSize="small" style={{ paddingTop: 5 }} />
            </div>
            <Popconfirm
              title="DELETE ACCOUNT"
              description="Are you sure to delete?"
              onConfirm={() => handleDelete(params.row.id)}
              onCancel={cancelConfirm}
              okText="Yes"
              cancelText="No"
            >
              <div className="deleteButton">
                <DeleteIcon fontSize="small" style={{ paddingTop: 5 }} />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
    {
      field: "newaction",
      headerName: "Sub-Services",
      flex: 0.8,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="newAction">
            <div
              className="viewSubButton"
              onClick={() => handleViewSub(params.row.id)}
            >
              View
            </div>
            <div
              className="viewAddButton"
              onClick={() => handleAddSub(params.row.id)}
            >
              Add
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
      width: 200,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="action">
            <div className="viewButton" onClick={() => handleView(params.row)}>
              <CalendarViewMonthIcon
                fontSize="small"
                style={{ paddingTop: 5 }}
              />
            </div>
            <div
              className="editButton"
              onClick={() => handleEditSub(params.row)}
            >
              <EditIcon fontSize="small" style={{ paddingTop: 5 }} />
            </div>
            <Popconfirm
              title="DELETE ACCOUNT"
              description="Are you sure to delete?"
              onConfirm={() => handleDeleteSub(params.row.id)}
              onCancel={cancelConfirm}
              okText="Yes"
              cancelText="No"
            >
              <div className="deleteButton">
                <DeleteIcon fontSize="small" style={{ paddingTop: 5 }} />
              </div>
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
            Add new service
          </p>
        </div>
      </div>
      {/* <Table
        columns={mechanicColumns.concat(actionColumn)}
        dataSource={data}
        style={{ width: "100%" }}
      /> */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DataGrid
          className="datagrid"
          rows={data}
          columns={serviceColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          autosizing
          disableVirtualization
          rowSelection={false}
          sx={{
            width: "70%",
            boxShadow: 2,
            border: 2,
            borderColor: "white",
            marginRight: "10px",
          }}
        />
        <DataGrid
          className="datagrid"
          rows={subData}
          columns={serviceColumns2.concat(actionColumn2)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          autosizing
          disableVirtualization
          rowSelection={false}
          sx={{
            width: "30%",
            height: "50%",
            boxShadow: 2,
            border: 2,
            borderColor: "white",
          }}
        />
      </div>
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
              ADD NEW SERVICE
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
                    name="Price"
                    label="Price"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter price",
                      },
                      { whitespace: false },
                    ]}
                    hasFeedback
                  >
                    <Input
                      style={{ border: "1px solid #98C4C4", width: 220 }}
                      type="number"
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
          {isEdit ? "Edit Service's Detail" : "Service's Detail"}
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
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Price"
                label={<h3 style={{ color: "#34acaf" }}>Price</h3>}
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

          {isEdit && (
            <Row gutter={16}>
              <Button
                type="primary"
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
          )}
        </Form>
      </Drawer>
    </div>
  );
};

export default Datatable;
