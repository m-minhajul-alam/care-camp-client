import { Outlet } from "react-router-dom";
import NavBar from "../Componants/NavBar/NavBar";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
