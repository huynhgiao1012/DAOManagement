import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import { useGetAllUserMutation } from "../../services/User";
import { useState } from "react";
import { useEffect } from "react";
// import { useGetAllFormAdminMutation } from "../../services/OrderForm";
const Widget = ({ type }) => {
  let data;
  // const [getAllUser] = useGetAllUserMutation();
  // const [getAllForm] = useGetAllFormAdminMutation();
  const [userAmount, setUserAmount] = useState(0);
  const [formAmount, setFormAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    // getAllUser()
    //   .unwrap()
    //   .then((payload) => {
    //     setUserAmount(payload.data.length);
    //   })
    //   .catch();
    // getAllForm()
    //   .unwrap()
    //   .then((payload) => {
    //     setFormAmount(payload.data.length);
    //     let num = 0;
    //     payload.data.map((val) => {
    //       num = num + val.price;
    //     });
    //     setBalance(num);
    //   })
    //   .catch();
  }, []);
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        amount: userAmount,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        amount: formAmount,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        amount: balance,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.amount} {data.isMoney && "$"}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          10%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
