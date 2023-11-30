import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CardMedia,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ArrowBack } from "@mui/icons-material";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const CampDetail = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();

  const {
    isPending,
    isError,
    error,
    data: campDetails,
  } = useQuery({
    queryKey: ["campDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/camps/${id}`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const age = form.age.value;
    const phone = form.phone.value;
    const gender = form.gender.value;
    const address = form.address.value;
    const healthInfo = form.healthInfo.value;
    const emergencyContact = form.emergencyContact.value;
    const registerInfo = {
      name,
      email,
      age,
      phone,
      gender,
      address,
      healthInfo,
      emergencyContact,
      campName: campDetails.campName,
      campId: campDetails._id,
      campFees: campDetails.campFees,
      scheduledDateTime: campDetails.scheduledDateTime,
      venueLocation: campDetails.venueLocation,
      paymentStatus: "Unpaid",
      confirmationStatus: "Pending",
    };
    console.log(registerInfo);

    try {
      const response = await axiosPublic.post("/regCamps", registerInfo);
      console.log(response);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error submitting form. Please try again.");
    }
    setOpenModal(false);
  };

  return (
    <Container sx={{ my: "28px" }}>
      {campDetails && (
        <>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={campDetails.image}
              alt={campDetails.campName}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {campDetails.campName}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                <strong> Date:</strong> {campDetails.scheduledDateTime}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong> Camp Fees: </strong>${campDetails.campFees}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong> Venue: </strong>
                {campDetails.venueLocation}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong> Target Audience:</strong> {campDetails.targetAudience}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong> Specialized Service:</strong>{" "}
                {campDetails.specializedService}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong> Healthcare Professional:</strong>{" "}
                {campDetails.healthcareProfessional}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {campDetails.description}
              </Typography>
            </CardContent>

            <Box sx={{ textAlign: "end", m: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => window.history.back()}
                sx={{ mr: 2 }}
              >
                <ArrowBack />
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                Join Camp
              </Button>
            </Box>
          </Card>

          <Dialog open={openModal} onClose={() => setOpenModal(false)}>
            <DialogTitle>Participant Registration</DialogTitle>
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  label="Camp Name"
                  name="campName"
                  value={campDetails?.campName}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Name"
                  name="name"
                  defaultValue={user?.displayName}
                  type="text"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Phone"
                  name="phone"
                  type="number"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Gender"
                  name="gender"
                  type="text"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Address"
                  name="address"
                  type="text"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Camp Fees"
                  value={campDetails.campFees}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Health-related Information"
                  name="healthInfo"
                  type="text"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Emergency Contact"
                  name="emergencyContact"
                  type="text"
                  fullWidth
                  margin="normal"
                />
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
                  Register
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default CampDetail;
