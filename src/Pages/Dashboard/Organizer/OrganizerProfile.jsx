import { useContext, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../../Providers/AuthProvider";

const OrganizerProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(user);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {};

  const handleUpdateProfile = () => {
    // Perform validation checks here
    // Update organizer's profile information in the backend
    // ...

    // Close the modal after successful update
    handleCloseModal();

    // Show success alert
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Organizer Profile
      </Typography>

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <img
          src={user?.photoURL}
          alt="Organizer Image"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <Typography variant="h6" color="primary" sx={{ mt: 2 }}></Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary" }}
        ></Typography>
      </Box>

      {/* Display other organizer information */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Contact:</strong>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Email:</strong>
      </Typography>

      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleOpenModal}
        >
          Update Profile
        </Button>
      </Box>

      {/* Modal for profile updates */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" color="primary" mb={2}>
            Update Profile
          </Typography>
          <TextField
            label="Name"
            fullWidth
            // value={formData.name}
            onChange={(e) => handleSubmit("name", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Contact"
            fullWidth
            // value={formData.contact}
            onChange={(e) => handleSubmit("contact", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Preferences"
            fullWidth
            // value={formData.preferences}
            onChange={(e) => handleSubmit("preferences", e.target.value)}
            margin="normal"
          />
          {/* Add more fields as needed */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateProfile}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for success alert */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Profile Updated Successfully!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default OrganizerProfile;
