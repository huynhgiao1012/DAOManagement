import "./form.scss";
import Sidebar from "../../../components/sidebarAcc/Sidebar";
import Navbar from "../../../components/navbar2/Navbar";
import Datatable from "../../../components/datatableFormAccountant/Datatable";
const Form = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default Form;
