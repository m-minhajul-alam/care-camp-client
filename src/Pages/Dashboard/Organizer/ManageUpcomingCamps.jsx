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

const ManageUpcomingCamps = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    isFetching,
    refetch,
    data: upcomingCamps,
  } = useQuery({
    queryKey: ["upcomingCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/upcomingCamps`);
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

  if (!upcomingCamps) {
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

  const handleDelUpcomingCamp = (upcomingCamp) => {
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
        axiosPublic.delete(`/upcomingCamps/${upcomingCamp._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Upcoming Capm has been deleted.",
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
        Manage Upcoming Camps
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bolder", fontSize: "13px" }}>
                Camp Name
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "13px" }}>
                Date and Time
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "13px" }}>
                Venue
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "13px" }}>
                Target Audience
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "13px" }}>
                Participant Count
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "13px" }}>
                Interested Professionals Count
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "13px" }}>
                Edit
              </TableCell>
              <TableCell style={{ fontWeight: "bolder", fontSize: "13px" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingCamps &&
              upcomingCamps?.map((upcomingCamp) => (
                <TableRow key={upcomingCamp._id}>
                  <TableCell>{upcomingCamp.campName}</TableCell>
                  <TableCell>{upcomingCamp.scheduledDateTime}</TableCell>
                  <TableCell>{upcomingCamp.venueLocation}</TableCell>
                  <TableCell>{upcomingCamp.targetAudience}</TableCell>
                  <TableCell>{upcomingCamp.participantCount}</TableCell>
                  <TableCell>
                    {upcomingCamp.interestedProfessionalsCount}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      to={`/dashboard/updateUpcomingCamps/${upcomingCamp._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelUpcomingCamp(upcomingCamp)}
                    >
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

export default ManageUpcomingCamps;
