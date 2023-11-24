import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Error from "../Pages/Error/Error";
import Home from "../Pages/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import CampDetail from "../Pages/CampDetail/CampDetail";

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
        // loader: ({ params }) => fetch(`campData.json/${params.id}`)
      },
    ],
  },
]);

export default router;
