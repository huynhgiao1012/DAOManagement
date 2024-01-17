import "./style/forgot.scss";
import { notification } from "antd";
import {
  GlobalOutlined,
  UserOutlined,
  LockOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import car2 from "../../Image/car2.gif";
import { useLoginMutation } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Row, Col } from "antd";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
function Copyright(props) {
  return (
    <Typography variant="body2" color="black" align="center" {...props}>
      {"Copyright © "}
      DAO Website - {new Date().getFullYear()}
    </Typography>
  );
}
// TODO remove, this demo shouldn't need to reset the theme.
export default function ForgotPassword({ socket }) {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const result = {
      newPassword: data.get("password"),
    };
    console.log(JSON.stringify(result));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
    console.log(options);
    fetch(
      `https://dao-applicationservice.onrender.com/api/v1/auth/reset-password?token=${token}&userId=${userId}`,
      options
    )
      .then((response) => response.json()) // chuyển kết quả trả về thành json object
      .then((result) => {
        if (!result.success) {
          alert(Object.values(result.message)[0]);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error); // ghi log nếu xảy ra lỗi
      });
  };

  return (
    <Container
      component="main"
      maxWidth="50%"
      style={{
        backgroundColor: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          style={{ color: "#34acaf", fontWeight: "bold" }}
        >
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            placeholder="New Password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{
              backgroundColor: "#3cbcc4",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Submit
          </Button>
        </Box>
        <Copyright sx={{ mt: 5, mb: 4 }} />
      </Box>
    </Container>
  );
}
