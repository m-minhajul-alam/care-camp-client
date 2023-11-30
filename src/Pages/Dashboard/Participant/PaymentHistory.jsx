// import { useState } from "react";
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
} from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const PaymentHistory = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
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

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
          Payment History
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
              </TableRow>
            </TableHead>
            <TableBody>
              {regCamps &&
                regCamps?.map((regCamp) => (
                  <TableRow key={regCamp.id}>
                    <TableCell>{regCamp.campName}</TableCell>
                    <TableCell>{regCamp.scheduledDateTime}</TableCell>
                    <TableCell>{regCamp.venueLocation}</TableCell>
                    <TableCell>{regCamp.campFees}</TableCell>
                    <TableCell>{regCamp.paymentStatus}</TableCell>
                    <TableCell>{regCamp.confirmationStatus}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default PaymentHistory;
