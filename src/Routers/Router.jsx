import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import CampDetail from "../Pages/CampDetail/CampDetail";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Dashboard from "../Pages/Dashboard/Dashboard";
import SignUp from "../Pages/SinngUp/SingUp";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/availableCamps",
        element: <AvailableCamps></AvailableCamps>,
      },
      {
        path: "/campDetail/:id",
        element: <CampDetail></CampDetail>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <Error></Error>,
  },
  {
    path: "/singUp",
    element: <SignUp></SignUp>,
    errorElement: <Error></Error>,
  },
  {
    path: "/logIn",
    element: <Login></Login>,
    errorElement: <Error></Error>,
  },
]);

export default router;
