import "./style6.scss";
import { DataGrid } from "@mui/x-data-grid";
import { formColumn } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetMaintenanceFormMutation,
  useUpdateFormMutation,
  useFormConfirmMutation,
  useGetNewMaintenanceFormMutation,
  useDeleteFormMutation,
} from "../../services/Manager";
import { Col, Form, Input, Row, Drawer, Popconfirm, Radio } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";
import Navbar from "../navbar/Navbar";
const { Search } = Input;
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
  const [getAllForm] = useGetMaintenanceFormMutation();
  const [getNewForm] = useGetNewMaintenanceFormMutation();
  const [deleteForm] = useDeleteFormMutation();
  const [formMark] = useFormConfirmMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loadData = () => {
    setData([]);
    getAllForm()
      .unwrap()
      .then((payload) => {
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
    loadData();
    getNewForm()
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((error) => {
        if (error.status === 401) {
          logOut();
        }
      });
  }, []);
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
  const handleClose = () => setOpen(false);
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
  const handleMark = (id) => {
    formMark({ id: id })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          loadData();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 401) {
          logOut();
        }
      });
  };
  const handleView = (data) => {
    handleOpen(data);
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
      // await createMechanicAccount({
      //   name: values.Name,
      //   email: values.Email,
      //   phone: values.Phone,
      //   group: values.Group,
      // })
      //   .unwrap()
      //   .then((payload) => {
      //     alert(payload.message);
      //     setIsModalOpen(false);
      //     loadData();
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
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
  const actionColumn = [
    {
      field: "created",
      headerName: "Created",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return moment(
          new Date(params.row.createdAt)
            .toLocaleString("en-GB")
            .split(", ")[0]
            .split("/")
            .reverse()
            .join("-") +
            " " +
            new Date(params.row.createdAt)
              .toLocaleString("en-GB")
              .split(", ")[1]
        ).fromNow();
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
            {params.row.status === "await" && (
              <div
                className="markBtn"
                onClick={() => handleMark(params.row._id)}
              >
                Mark
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h5 style={{ color: "#196462", fontWeight: "bold" }}>
          List of maintenance form (in processing)
        </h5>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Search by phone"
          onChange={(e) => onSearch(e.target.value)}
        />
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
