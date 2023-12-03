import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { CancelOutlined, PaymentOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const RegisteredCamps = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    refetch,
    isFetching,
    data: regCamps,
  } = useQuery({
    queryKey: ["regCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/regCamps`);
      return res.data;
    },
  });
  if (isPending) {
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

  if (isFetching) {
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

  if (!regCamps) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "red",
        }}
      >
        No Data Found
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          color: "red",
        }}
      >
        {error.message}
      </Box>
    );
  }

  const handleDeleteRegCamp = (regCamp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/regCamps/${regCamp._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Canceled!",
              text: "Your Reg.Capm has been Canceled.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <Container>
      <Helmet>
        <title>Care Camp | Dashboard | Regidtered Camps</title>
      </Helmet>

      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Registered Camps
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Camp Name</strong>
              </TableCell>
              <TableCell>
                <strong>Date and Time</strong>
              </TableCell>
              <TableCell>
                <strong>Venue</strong>
              </TableCell>
              <TableCell>
                <strong>Camp Fees</strong>
              </TableCell>
              <TableCell>
                <strong>Payment Status</strong>
              </TableCell>
              <TableCell>
                <strong>Confirmation Status</strong>
              </TableCell>
              <TableCell>
                <strong>Cancel</strong>
              </TableCell>
              <TableCell>
                <strong>Payment</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regCamps &&
              regCamps?.map((regCamp) => (
                <TableRow key={regCamp.id}>
                  <TableCell>{regCamp.campName}</TableCell>
                  <TableCell>{regCamp.scheduledDateTime}</TableCell>
                  <TableCell>{regCamp.venueLocation}</TableCell>
                  <TableCell>${regCamp.campFees}</TableCell>
                  <TableCell>{regCamp.paymentStatus}</TableCell>
                  <TableCell>{regCamp.confirmationStatus}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteRegCamp(regCamp)}
                      disabled={regCamps.paymentStatus === "Paid"}
                      sx={{ minWidth: 0 }}
                    >
                      <CancelOutlined />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {regCamps.paymentStatus !== "Paid" ? (
                      <IconButton
                        component={Link}
                        to={"/dashboard/payment"}
                        sx={{ minWidth: 0, my: 1 }}
                      >
                        <PaymentOutlined />
                      </IconButton>
                    ) : (
                      "Paid"
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RegisteredCamps;
