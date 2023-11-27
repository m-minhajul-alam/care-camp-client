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
import PaymentHistory from "../Pages/Dashboard/Participant/PaymentHistory";
import Feedback from "../Pages/Dashboard/Participant/Feedback";
import RegisteredCamps from "../Pages/Dashboard/Participant/RegisteredCamps";
import AddCamp from "../Pages/Dashboard/Organizer/AddCamp";
import ManageCamps from "../Pages/Dashboard/Organizer/ManageCamps";
import ManageRegisteredCamps from "../Pages/Dashboard/Organizer/ManageRegisteredCamps";
import Profile from "../Pages/Dashboard/Profile";
import AddUpcomingCamp from "../Pages/Dashboard/Organizer/AddUpcomingCamp";
import ManageUpcomingCamps from "../Pages/Dashboard/Organizer/ManageUpcomingCamps";
import AcceptedCamps from "../Pages/Dashboard/HelthCare/AcceptedCamps";
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <PrivateRoute>
            <AvailableCamps></AvailableCamps>
          </PrivateRoute>
        ),
      },
      {
        path: "/campDetail/:id",
        element: (
          <PrivateRoute>
            <CampDetail></CampDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "/dashboard",
        element: <Profile></Profile>,
      },

      // Organizer
      {
        path: "/dashboard/addCamp",
        element: <AddCamp></AddCamp>,
      },
      {
        path: "/dashboard/manageCamps",
        element: <ManageCamps></ManageCamps>,
      },
      {
        path: "/dashboard/addUpcomingCamp",
        element: <AddUpcomingCamp></AddUpcomingCamp>,
      },
      {
        path: "/dashboard/manageRegisteredCamps",
        element: <ManageRegisteredCamps></ManageRegisteredCamps>,
      },
      {
        path: "/dashboard/manageUpcomingCamps",
        element: <ManageUpcomingCamps></ManageUpcomingCamps>,
      },

      // Health Care
      {
        path: "/dashboard/acceptedCamps",
        element: <AcceptedCamps></AcceptedCamps>,
      },

      // Participant
      {
        path: "/dashboard/registeredCamps",
        element: <RegisteredCamps></RegisteredCamps>,
      },
      {
        path: "/dashboard/paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/feedback",
        element: <Feedback></Feedback>,
      },
    ],
  },
  {
    path: "/singup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
    errorElement: <Error></Error>,
  },
]);

export default router;
