import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import Home from "../../Pages/home/Home";
import Mechanic from "../../Pages/Manager/Mechanic/Mechanic";
import Accountant from "../../Pages/Manager/Accountant/Accountant";
import GarageService from "../../Pages/Manager/GarageService/GarageService";
import GarageDetails from "../../Pages/Manager/GarageDetails/GarageDetails";
import GarageCustomer from "../../Pages/Manager/GarageCustomer/GarageCustomer";
import GarageForms from "../../Pages/Manager/GarageForms/GarageForms";
import AdminProfile from "../../Pages/Admin/AdminProfile";
import AccountMana from "../../Pages/Admin/AccountMana";
import GarageMana from "../../Pages/Admin/GarageMana";
import MyProfile from "../../Pages/Manager/MyProfile/MyProfile";
import AccountantProfile from "../../Pages/AccountantPages/Profile/index";
import CarSpare from "../../Pages/AccountantPages/CarSpare/index";
import OrderForm from "../../Pages/AccountantPages/OrderForm/index";
// import ManagerHome from "../../Pages/mHome/index";
// import Login from "../../Pages/Login/index";
import { Routes, Route } from "react-router-dom";
import "../../style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import GarageFeedback from "../../Pages/Manager/GarageFeedback/GarageFeedback";
import LoginComponent from "../../Pages/Login";
import ForgotPassword from "../../Pages/ForgotPassword";
const DefaultLayoutComponent = ({ socket }) => {
  const { i18n } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/login");
    // } else {
    //   navigate(window.location.pathname);
    // }
  }, []);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route exact path="/login" element={<LoginComponent />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="mechanic">
          <Route index element={<Mechanic socket={socket} />} />
        </Route>
        <Route path="accountant">
          <Route index element={<Accountant socket={socket} />} />
        </Route>
        <Route path="garaServices">
          <Route index element={<GarageService socket={socket} />} />
        </Route>
        <Route path="garaDetails">
          <Route index element={<GarageDetails socket={socket} />} />
        </Route>
        <Route path="garaCustomer">
          <Route index element={<GarageCustomer socket={socket} />} />
        </Route>
        <Route path="garaFeedback">
          <Route index element={<GarageFeedback socket={socket} />} />
        </Route>
        <Route path="garaForms">
          <Route index element={<GarageForms socket={socket} />} />
        </Route>
        <Route path="myProfile">
          <Route index element={<MyProfile socket={socket} />} />
        </Route>
        <Route path="adminProfile">
          <Route index element={<AdminProfile socket={socket} />} />
        </Route>
        <Route path="account">
          <Route index element={<AccountMana socket={socket} />} />
        </Route>
        <Route path="garageManagement">
          <Route index element={<GarageMana socket={socket} />} />
        </Route>
        <Route path="accountantProfile">
          <Route index element={<AccountantProfile socket={socket} />} />
        </Route>
        <Route path="carSpares">
          <Route index element={<CarSpare socket={socket} />} />
        </Route>
        <Route path="form">
          <Route index element={<OrderForm socket={socket} />} />
        </Route>
      </Routes>
    </div>
  );
};

const DefaultLayout = withTranslation()(DefaultLayoutComponent);
export default DefaultLayout;
