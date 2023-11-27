/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
