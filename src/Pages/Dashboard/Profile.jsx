import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const Profile = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {};

  const handleUpdateProfile = () => {
    handleCloseModal();
    toast.success("Profile Updated Successfully!");
  };

  return (
    <Container>
      <Container sx={{ maxWidth: "10px" }}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box>
            <img
              src={user?.photoURL}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <Box sx={{ textAlign: "center", mb: 3, mt: -6 }}>
              <img
                src={user?.photoURL}
                alt="Image"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
              <Typography
                variant="h6"
                color="primary"
                sx={{ mt: 2 }}
              ></Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary" }}
              ></Typography>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              {user?.displayName}
            </Typography>

            <Typography variant="body2" color="textSecondary" gutterBottom>
              {user?.email}
            </Typography>

            <Typography variant="body2" color="textSecondary" gutterBottom>
              {" "}
            </Typography>
          </CardContent>

          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenModal}
            >
              <EditIcon sx={{ mr: 1 }} /> Update Profile
            </Button>
          </Box>
        </Card>
      </Container>

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
            value={user.displayName}
            onChange={(e) => handleSubmit("name", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={user.email}
            onChange={(e) => handleSubmit("email", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Mobil"
            fullWidth
            onChange={(e) => handleSubmit("preferences", e.target.value)}
            margin="normal"
          />
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProfile}
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Profile;
