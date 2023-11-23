import { Outlet } from "react-router-dom";
import NavBar from "../Componants/NavBar/NavBar";
import Footer from "../Componants/Footer/Footer";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
