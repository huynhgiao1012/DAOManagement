import "./navbar.scss";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailMutation } from "../../services/User";
import { useGetNewMaintenanceFormMutation } from "../../services/Manager";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  useGetUnreadNotiMutation,
  useUpdateNotiMutation,
  useDeleteNotiMutation,
} from "../../services/Notification";
import moment from "moment";

const Navbar = ({ socket }) => {
  const navigate = useNavigate();
  const [getUserDetail] = useGetUserDetailMutation();
  const [getNewForm] = useGetNewMaintenanceFormMutation();
  const [getUnread] = useGetUnreadNotiMutation();
  const [updateNoti] = useUpdateNotiMutation();
  const [deleteNoti] = useDeleteNotiMutation();
  const [listNoti, setListNoti] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [data, setData] = useState({
    _id: "",
    email: "",
    isActive: false,
    name: "",
    phone: "",
    role: "",
    img: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const convertTime12to24 = (time12h) => {
    const hours = time12h.getHours();
    const minutes = time12h.getMinutes();

    // Convert the hour to the 24-hour format
    let convertedHours = hours;
    if (hours > 12) {
      convertedHours -= 12;
    }

    // Set the hour to the 24-hour format
    time12h.setHours(convertedHours);

    // Log the converted time
    console.log(time12h.toLocaleTimeString());
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNotifications([]);
    setListNoti([]);
    getUnread()
      .unwrap()
      .then((payload) => {
        setListNoti((prev) => [...prev, ...payload.data]);
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          logOut();
        }
      });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRead = (id) => {
    setListNoti([]);
    setNotifications([]);
    updateNoti({ id: id })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          alert(payload.message);
          getUnread()
            .unwrap()
            .then((payload) => {
              setListNoti((prev) => [...prev, ...payload.data]);
            })
            .catch((error) => {
              if (error.data.message === "Token is exprired") {
                logOut();
              }
            });
        }
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          logOut();
        }
      });
  };
  const handleDelete = (id) => {
    setListNoti([]);
    setNotifications([]);
    deleteNoti({ id: id })
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          alert(payload.message);
          getUnread()
            .unwrap()
            .then((payload) => {
              setListNoti((prev) => [...prev, ...payload.data]);
            })
            .catch((error) => {
              if (error.data.message === "Token is exprired") {
                logOut();
              }
            });
        }
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          logOut();
        }
      });
  };
  useEffect(() => {
    setListNoti([]);
    getUnread()
      .unwrap()
      .then((payload) => {
        setListNoti((prev) => [...prev, ...payload.data]);
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          logOut();
        }
      });
    socket.on("getNotification", (data) => {
      if (data) {
        setNotifications([]);
        setListNoti([]);
        setNotifications((prev) => [...prev, data]);
        getUnread()
          .unwrap()
          .then((payload) => {
            setListNoti((prev) => [...prev, ...payload.data]);
          })
          .catch((error) => {
            if (error.data.message === "Token is exprired") {
              logOut();
            }
          });
      }
    });
    getUserDetail()
      .unwrap()
      .then((payload) => {
        setData((prev) => ({ ...prev, ...payload.data }));
      })
      .catch((error) => {
        if (error.data.message === "Token is exprired") {
          logOut();
        }
      });
  }, []);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="name">
          <h2>Welcome back !</h2>
        </div>
        <div className="items">
          <div>
            <div>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                style={{
                  backgroundColor: "#f8f8f8",
                  display: "flex",
                }}
              >
                {(notifications.length > 0 || listNoti.length > 0) && (
                  <img
                    src={require("../../Image/noti.gif")}
                    style={{ width: 50, height: 50 }}
                  />
                )}

                <h3
                  style={{
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontWeight: "bolder",
                    color: "#3cbcc4",
                  }}
                >
                  Notifications
                </h3>
              </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                style={{ width: "100%" }}
              >
                {listNoti.length > 0 ? (
                  listNoti.map((val) => {
                    return (
                      <div
                        onClick={handleClose}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          width: 450,
                          padding: "10px 0px",
                          margin: "0px 20px",
                          borderBottom:
                            listNoti.length > 1 ? "3px solid #e8e8e8" : "None",
                        }}
                      >
                        <div>
                          <h4
                            style={{
                              width: "70%",
                              color: "#3C3434",
                              fontStyle: "oblique",
                            }}
                          >
                            {val.text}
                          </h4>
                          <h5
                            style={{
                              width: "70%",
                              color: "#34acaf",
                              fontStyle: "oblique",
                            }}
                          >
                            {moment(
                              new Date(val.createAt)
                                .toLocaleString("en-GB")
                                .split(", ")[0]
                                .split("/")
                                .reverse()
                                .join("-") +
                                " " +
                                new Date(val.createAt)
                                  .toLocaleString("en-GB")
                                  .split(", ")[1]
                            ).fromNow()}
                          </h5>
                        </div>
                        <div style={{ width: 100, display: "flex" }}>
                          <button
                            onClick={() => {
                              handleRead(val._id);
                            }}
                            style={{
                              border: "none",
                              backgroundColor: "#3cbcc4",
                              color: "white",
                              borderRadius: 5,
                              fontSize: 16,
                              marginRight: 8,
                              padding: 8,
                            }}
                          >
                            <DraftsIcon
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(val._id);
                            }}
                            style={{
                              border: "none",
                              backgroundColor: "red",
                              color: "white",
                              borderRadius: 5,
                              fontSize: 16,
                              padding: 8,
                            }}
                          >
                            <DeleteForeverIcon
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <MenuItem onClick={handleClose}>
                    There are currently no announcements
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>
          <button onClick={() => logOut()} className="btn">
            <PowerSettingsNewIcon
              className="icon"
              fontSize="medium"
              style={{ paddingTop: "5px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
