import "./App.css";
import Defaultlayout from "./Component/DefaultLayout";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client";
const socket = socketIO.connect("https://dao-applicationservice.onrender.com");
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login socket={socket} />} />
          <Route path="/*" element={<Defaultlayout socket={socket} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
// import Home from "./Pages/home/Home";
// import Login from "./Pages/Login/index";
// import List from "./Pages/list/List";
// import Single from "./Pages/single/Single";
// import New from "./Pages/new/New";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";

// function App() {
//   const { darkMode } = useContext(DarkModeContext);

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/">
//             <Route index element={<Home />} />
//             <Route path="login" element={<Login />} />
//             <Route path="users">
//               <Route index element={<List />} />
//               <Route path=":userId" element={<Single />} />
//               <Route
//                 path="new"
//                 element={<New inputs={userInputs} title="Add New User" />}
//               />
//             </Route>
//             <Route path="products">
//               <Route index element={<List />} />
//               <Route path=":productId" element={<Single />} />
//               <Route
//                 path="new"
//                 element={<New inputs={productInputs} title="Add New Product" />}
//               />
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
