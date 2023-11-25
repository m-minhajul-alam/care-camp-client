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
import OrganizerProfile from "../Pages/Dashboard/Organizer/OrganizerProfile";
import HealthCareProfile from "../Pages/Dashboard/HelthCare/HealthCareProfile";
import ParticipantProfile from "../Pages/Dashboard/Participant/ParticipantProfile";
import PaymentHistory from "../Pages/Dashboard/Participant/PaymentHistory";
import Feedback from "../Pages/Dashboard/Participant/Feedback";
import RegisteredCamps from "../Pages/Dashboard/Participant/RegisteredCamps";
import AddCamp from "../Pages/Dashboard/Organizer/AddCamp";
import ManageCamps from "../Pages/Dashboard/Organizer/ManageCamps";
import ManageRegisteredCamps from "../Pages/Dashboard/Organizer/ManageRegisteredCamps";

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
    children: [
      // Organizer
      {
        path: "/dashboard",
        element: <OrganizerProfile></OrganizerProfile>,
      },
      {
        path: "/dashboard/addCamp",
        element: <AddCamp></AddCamp>,
      },
      {
        path: "/dashboard/manageCamps",
        element: <ManageCamps></ManageCamps>,
      },
      {
        path: "/dashboard/manageRegisteredCamps",
        element: <ManageRegisteredCamps></ManageRegisteredCamps>,
      },

      // HealthCare
      {
        path: "/dashboard",
        element: <HealthCareProfile></HealthCareProfile>,
      },

      // Participant
      {
        path: "/dashboard",
        element: <ParticipantProfile></ParticipantProfile>,
      },
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
