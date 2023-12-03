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
import { Helmet } from "react-helmet-async";

const ManageCamps = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    refetch,
    isFetching,
    data: camps,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/camps`);
      return res.data;
    },
  });

  console.log(camps);

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

  if (!camps) {
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

  const handleDeleteCamp = (camp) => {
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
        axiosPublic.delete(`/camps/${camp._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Camp has been deleted.",
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
        <title>Care Camp | Dashboard | Manege Camps</title>
      </Helmet>

      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Manage Camps
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
                Edit
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "15px" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {camps &&
              camps?.map((camp) => (
                <TableRow key={camp._id}>
                  <TableCell>{camp.campName}</TableCell>
                  <TableCell>{camp.scheduledDateTime}</TableCell>
                  <TableCell>{camp.venueLocation}</TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      to={`/dashboard/updateCamps/${camp._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteCamp(camp)}>
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

export default ManageCamps;
