import * as React from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import campData from "../../../public/campData.json";

const CampDetail = () => {
  const { id } = useParams();
  const [campDetails, setCampDetails] = React.useState(null);
  const [openRegistrationModal, setOpenRegistrationModal] =
    React.useState(false);
  const [participantInfo, setParticipantInfo] = React.useState({
    name: "",
    age: "",
    phone: "",
    gender: "",
    address: "",
  });

  React.useEffect(() => {
    const selectedCamp = campData.find((camp) => camp.id === id);

    if (selectedCamp) {
      setCampDetails(selectedCamp);
    } else {
      console.error(`Camp with ID ${id} not found`);
    }
  }, [id]);

  const handleJoinCamp = () => {
    setOpenRegistrationModal(true);
  };

  const handleCloseRegistrationModal = () => {
    setOpenRegistrationModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParticipantInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleRegisterParticipant = () => {
    console.log("Registering participant:", participantInfo);

    handleCloseRegistrationModal();
  };

  return (
    <Container sx={{ my: "68px" }}>
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
                <strong> Venue: </strong>
                {campDetails.venueLocation}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <strong> Target Audience:</strong> {campDetails.targetAudience}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {campDetails.description}
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleJoinCamp}
            >
              Join Camp
            </Button>
          </Box>

          <Dialog
            open={openRegistrationModal}
            onClose={handleCloseRegistrationModal}
          >
            <DialogTitle>Participant Registration</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                name="name"
                value={participantInfo.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age"
                name="age"
                value={participantInfo.age}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                name="phone"
                value={participantInfo.phone}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Gender"
                name="gender"
                value={participantInfo.gender}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={participantInfo.address}
                onChange={handleInputChange}
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
                fullWidth
                margin="normal"
              />
              <TextField
                label="Emergency Contact"
                name="emergencyContact"
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRegistrationModal} color="primary">
                Cancel
              </Button>
              <Button onClick={handleRegisterParticipant} color="primary">
                Register
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default CampDetail;
