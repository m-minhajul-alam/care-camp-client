/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loding } = useAuth();
  const location = useLocation();

  if (loding) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
