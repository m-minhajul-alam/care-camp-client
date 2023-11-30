import {
  Container,
  Typography,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

const ManageRegisteredCamps = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    refetch,
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

  const handleDeleteRegCamp = (regCamp) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/regCamps/${regCamp._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Reg.Capm has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <Container>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Manage Registered Camps
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Camp Name
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Date and Time
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Venue
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Camp Fees
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Payment Status
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Confirmation Status
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Edit
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {regCamps?.map((regCamp) => (
              <TableRow key={regCamp._id}>
                <TableCell>{regCamp.campName}</TableCell>
                <TableCell>{regCamp.scheduledDateTime}</TableCell>
                <TableCell>{regCamp.venueLocation}</TableCell>
                <TableCell>${regCamp.campFees}</TableCell>
                <TableCell>{regCamp.paymentStatus}</TableCell>
                <TableCell>{regCamp.confirmationStatus}</TableCell>
                <TableCell>
                  <IconButton component={Link}>
                    <EditIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <IconButton onClick={() => handleDeleteRegCamp(regCamp)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageRegisteredCamps;
