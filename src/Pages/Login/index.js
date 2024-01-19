import "./style/login.scss";
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
export default function LoginComponent({ socket }) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    window.history.forward();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      email: data.get("email"),
      password: data.get("password"),
    })
      .unwrap()
      .then((payload) => {
        if (payload) {
          if (payload.role === "admin") {
            notification.open({
              message: "Login",
              description: "Successfully",
              icon: <DownOutlined style={{ color: "green" }} />,
            });
            navigate("/adminProfile");
            localStorage.setItem("token", payload.token);
          } else if (payload.role === "manager") {
            const decodedHeader = jwtDecode(payload.token);
            socket.emit("newUser", decodedHeader.id);
            notification.open({
              message: "Login",
              description: "Successfully",
              icon: <DownOutlined style={{ color: "green" }} />,
            });
            navigate("/garaDetails");
            localStorage.setItem("token", payload.token);
          } else if (payload.role === "accountant") {
            notification.open({
              message: "Login",
              description: "Successfully",
              icon: <DownOutlined style={{ color: "green" }} />,
            });
            navigate("/accountantProfile");
            localStorage.setItem("token", payload.token);
          } else {
            notification.open({
              message: "Login",
              description: "Failed ! Don't have permission",
              icon: <CloseOutlined style={{ color: "red" }} />,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          notification.open({
            message: "Login",
            description: "Failed",
            icon: <CloseOutlined style={{ color: "red" }} />,
          });
        }
      });
  };

  return (
    <Container
      component="main"
      maxWidth="100%"
      style={{ backgroundColor: "white", height: "100vh" }}
    >
      <Row>
        <Col
          span={14}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              fontSize: 100,
              textTransform: "uppercase",
              color: "#3cbcc4",
            }}
          >
            DAO
          </h2>
          <h3 className="animationText">ONROAD VEHICLE BREAKDOWN ASSISTANCE</h3>
          <img
            src={car2}
            style={{
              width: "65%",
              height: "65%",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col
          span={10}
          style={{
            backgroundColor: "#fffafa",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "70%",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              style={{ color: "#34acaf", fontWeight: "bold" }}
            >
              SIGN IN
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 5 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Email Address"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                placeholder="Password"
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
                  fontSize: 20,
                  border: "3px solid white",
                }}
              >
                Sign In
              </Button>
            </Box>
            <Copyright sx={{ mt: 5, mb: 4 }} />
          </Box>
        </Col>
      </Row>
    </Container>
  );
}
