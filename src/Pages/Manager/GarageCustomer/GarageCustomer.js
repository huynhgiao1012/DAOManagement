import "./style8.scss";
import Sidebar from "../../../components/sidebarMa/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

const GarageCustomer = ({ socket }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar socket={socket} />
      </div>
    </div>
  );
};

export default GarageCustomer;
