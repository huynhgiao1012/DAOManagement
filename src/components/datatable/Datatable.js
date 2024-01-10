import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Col, Form, Input, Row, Drawer, Popconfirm, Skeleton } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import {
  useGetAllUserMutation,
  useSetInActiveMutation,
} from "../../services/User";
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
  const [getAllUser, { isLoading }] = useGetAllUserMutation();
  const [setActive] = useSetInActiveMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
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
    });
  };
  const handleClose = () => setOpen(false);

  const loadData = () => {
    setData([]);
    getAllUser()
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.data.map((val) => {
          newArr.push({
            id: val._id,
            name: val.name,
            img: val.img,
            status: val.isActive ? "active" : "inactive",
            email: val.email,
            phone: val.phone,
            role: val.role,
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
    // await deleteMechanic({ id: id })
    //   .unwrap()
    //   .then((payload) => {
    //     if (payload.success) {
    //       <Alert severity="success">{payload.message}</Alert>;
    //       loadData();
    //     }
    //   });
  };
  const handleActive = (id) => {
    const obj = { status: true };
    setActive({ id: id, ...obj })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          loadData();
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          logOut();
        }
      });
  };
  const handleInActive = (id) => {
    const obj = { status: false };
    setActive({ id: id, ...obj })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          loadData();
        }
      })
      .catch((error) => {
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
    }
  };
  const actionColumn = [
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
            {params.row.status === "active" ? (
              <div
                className="inactiveBtn"
                onClick={() => handleInActive(params.row.id)}
              >
                InActive
              </div>
            ) : (
              <div
                className="activeBtn"
                onClick={() => handleActive(params.row.id)}
              >
                Active
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle"></div>
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
          columns={userColumns.concat(actionColumn)}
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
      <Drawer width={500} onClose={handleClose} open={open}>
        <p style={{ fontSize: "30px", color: "#34acaf", fontWeight: "bold" }}>
          Account's Detail
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
        </Form>
      </Drawer>
    </div>
  );
};

export default Datatable;
