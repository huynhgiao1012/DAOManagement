import "./style8.scss";
import Sidebar from "../../../components/sidebarMa/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

const GarageCustomer = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default GarageCustomer;
