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
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Rating,
} from "@mui/material";
import { ReviewsSharp } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const Feedback = () => {
  const axiosPublic = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();

  const {
    isPending,
    isError,
    error,
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

  const filteredCamps = regCamps?.filter(
    (regCamp) =>
      regCamp.paymentStatus === "Paid" &&
      regCamp.confirmationStatus === "Confirmed"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const feedback = form.feedback.value;
    const rating = form.rating.value;
    const feedbackInfo = {
      name,
      feedback,
      rating,
    };
    console.log(feedbackInfo);

    try {
      const response = await axiosPublic.post("/feedback", feedbackInfo);
      console.log(response);
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error submitting feedback. Please try again.");
    }
    setOpenModal(false);
  };

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
          Feedback
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
                  <strong>Review</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCamps &&
                filteredCamps?.map((regCamp) => (
                  <TableRow key={regCamp.id}>
                    <TableCell>{regCamp.campName}</TableCell>
                    <TableCell>{regCamp.scheduledDateTime}</TableCell>
                    <TableCell>{regCamp.venueLocation}</TableCell>
                    <TableCell>${regCamp.campFees}</TableCell>
                    <TableCell>{regCamp.paymentStatus}</TableCell>
                    <TableCell>{regCamp.confirmationStatus}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => setOpenModal(true)}
                        sx={{ minWidth: 0 }}
                      >
                        <ReviewsSharp />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Participant Registration</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                label="Name"
                name="name"
                value={user.displayName}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Feedback"
                multiline
                rows={4}
                fullWidth
                name="feedback"
                variant="outlined"
                margin="normal"
              />
              <Typography variant="subtitle1" gutterBottom>
                Rating:{" "}
                <Rating name="rating" defaultValue={0} precision={0.5} />
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenModal(false)}
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </>
  );
};

export default Feedback;
