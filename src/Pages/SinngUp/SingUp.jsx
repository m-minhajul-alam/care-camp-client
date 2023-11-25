import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    email: "",
    password: "",
    role: "Participant",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send formData to the backend for user registration
    // ...

    // Reset form data after submission
    setFormData({
      name: "",
      image: null,
      email: "",
      password: "",
      role: "Participant",
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
    });
  };

  const renderAdditionalQuestions = () => {
    if (formData.role === "HealthcareProfessional") {
      return (
        <>
          <TextField
            label="Do you have any allergies?"
            fullWidth
            value={formData.question1}
            onChange={(e) => handleInputChange("question1", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Do you have professional experience in healthcare?"
            fullWidth
            value={formData.question2}
            onChange={(e) => handleInputChange("question2", e.target.value)}
            margin="normal"
          />
        </>
      );
    }

    if (formData.role === "Organizer") {
      return (
        <>
          <TextField
            label="Have you planned and organized events before?"
            fullWidth
            value={formData.question1}
            onChange={(e) => handleInputChange("question1", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Have you managed budgets for events in the past?"
            fullWidth
            value={formData.question2}
            onChange={(e) => handleInputChange("question2", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Have you successfully organized an event in the past?"
            fullWidth
            value={formData.question3}
            onChange={(e) => handleInputChange("question3", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Do you smoke or use tobacco products?"
            fullWidth
            value={formData.question4}
            onChange={(e) => handleInputChange("question4", e.target.value)}
            margin="normal"
          />
          <TextField
            label="Have you ever been diagnosed with a chronic illness?"
            fullWidth
            value={formData.question5}
            onChange={(e) => handleInputChange("question5", e.target.value)}
            margin="normal"
          />
        </>
      );
    }

    return null;
  };

  return (
    <Container>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          margin="normal"
        />
        <TextField
          type="file"
          label="Profile Image"
          fullWidth
          onChange={handleImageUpload}
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
          >
            <MenuItem value="Participant">Participant</MenuItem>
            <MenuItem value="HealthcareProfessional">
              Healthcare Professional
            </MenuItem>
            <MenuItem value="Organizer">Organizer</MenuItem>
          </Select>
        </FormControl>
        {renderAdditionalQuestions()}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
