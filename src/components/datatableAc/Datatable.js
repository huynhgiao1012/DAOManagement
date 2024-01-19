import "./style2.scss";
import { DataGrid } from "@mui/x-data-grid";
import { accountantColumns } from "../../datatablesource";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetAllAccountantMutation,
  useCreateAccountantAccountMutation,
  useDeleteAccountantMutation,
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
const Datatable = () => {
  const [data, setData] = useState([]);
  const [getAllAccountant] = useGetAllAccountantMutation();
  const [createAccountant] = useCreateAccountantAccountMutation();
  const [deleteAccountant] = useDeleteAccountantMutation();
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
    });
  };
  const handleClose = () => setOpen(false);

  const loadData = () => {
    setData([]);
    getAllAccountant()
      .unwrap()
      .then((payload) => {
        var newArr = [];
        payload.accountant.map((val, index) => {
          newArr.push({
            id: val._id,
            name: val.accountId.name,
            img: val.accountId.img,
            email: val.accountId.email,
            phone: val.accountId.phone,
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
    await deleteAccountant({ id: id })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          <Alert severity="success">{payload.message}</Alert>;
          loadData();
        }
      });
  };
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
    } else {
      await createAccountant({
        name: values.Name,
        email: values.Email,
        phone: values.Phone,
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
      getAllAccountant()
        .unwrap()
        .then((payload) => {
          setData([]);
          var newArr = [];
          payload.accountant.map((val, index) => {
            newArr.push({
              id: val._id,
              name: val.accountId.name,
              img: val.accountId.img,
              email: val.accountId.email,
              phone: val.accountId.phone,
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
      getAllAccountant()
        .unwrap()
        .then((payload) => {
          setData([]);
          var newArr = [];
          payload.accountant.map((val, index) => {
            if (
              val.accountId.name.toUpperCase().includes(value.toUpperCase())
            ) {
              newArr.push({
                id: val._id,
                name: val.accountId.name,
                img: val.accountId.img,
                email: val.accountId.email,
                phone: val.accountId.phone,
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
            Add new accountant
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
      {/* <Table
        columns={mechanicColumns.concat(actionColumn)}
        dataSource={data}
        style={{ width: "100%" }}
      /> */}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={accountantColumns.concat(actionColumn)}
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
