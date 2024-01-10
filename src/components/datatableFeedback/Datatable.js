import "./style12.scss";
import { DataGrid } from "@mui/x-data-grid";
import { feedbackColumn } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useCreateMechanicAccountMutation,
  useDeleteMechanicMutation,
  useGetAllFeedbackMutation,
} from "../../services/Manager";
import { Col, Form, Input, Row, Drawer } from "antd";
import moment from "moment";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [getAllFeedback] = useGetAllFeedbackMutation();
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
      CustomerName: data.customerName,
      CustomerPhone: data.phone,
      Service: data.service,
      Price: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.price),
      Date: data.date.split("-").reverse().join("-"),
      Rating: data.rating,
      Review: data.review,
    });
  };
  const handleClose = () => setOpen(false);

  const loadData = () => {
    setData([]);
    getAllFeedback()
      .unwrap()
      .then((payload) => {
        console.log(payload.feedback);
        var newArr = [];
        payload.feedback.map((val, index) => {
          newArr.push({
            id: val._id,
            customerName: val.customerId.name,
            phone: val.customerId.phone,
            service: val.formID.service,
            price: val.formID.price,
            date: val.formID.date,
            rating: val.rating,
            review: val.review,
            createdAt: val.createdAt,
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
  const handleView = (data) => {
    handleOpen(data);
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
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleView(params.row)}>
              View
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle"></div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={feedbackColumn.concat(actionColumn)}
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
        <p style={{ fontSize: "30px", color: "#34acaf", fontWeight: "bold" }}>
          Feedback's Detail
        </p>
        <Form
          form={form}
          name="form"
          labelCol={{ span: 18 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
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
                name="CustomerName"
                label={<h3 style={{ color: "#34acaf" }}>Customer's Name</h3>}
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
                name="CustomerPhone"
                label={<h3 style={{ color: "#34acaf" }}>Customer's Phone</h3>}
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
                name="Service"
                label={<h3 style={{ color: "#34acaf" }}>Service</h3>}
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
                name="Price"
                label={<h3 style={{ color: "#34acaf" }}>Price of Service</h3>}
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
                name="Date"
                label={<h3 style={{ color: "#34acaf" }}>Date of Service</h3>}
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
                name="Rating"
                label={<h3 style={{ color: "#34acaf" }}>Total Rating</h3>}
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
                name="Review"
                label={<h3 style={{ color: "#34acaf" }}>Review of Customer</h3>}
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
