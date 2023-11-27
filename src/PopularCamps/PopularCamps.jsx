import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const PopularCamps = () => {
  const [camps, setCamps] = useState([]);
  const [participantCounts, setParticipantCounts] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCampForRegistration, setSelectedCampForRegistration] =
    useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/campData.json");
        const data = await response.json();
        setCamps(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRegister = (campName) => {
    setSelectedCampForRegistration(campName);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleRegisterConfirmation = (campName) => {
    setParticipantCounts((prevCounts) => ({
      ...prevCounts,
      [campName]: (prevCounts[campName] || 0) + 1,
    }));
    setOpenDialog(false);
  };

  return (
    <Container sx={{ my: "68px" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          font: "700px",
          mb: "26px",
          color: "#00A19D",
        }}
        gutterBottom
      >
        Popular Medical Camps
      </Typography>
      <Grid container spacing={2}>
        {camps.slice(0, 6).map((camp) => (
          <Grid item key={camp.campName} xs={12} sm={6} md={4} lg={4} xl={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <img
                src={camp.image}
                alt={camp.campName}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <CardContent sx={{ spacing: "5px", flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  {camp.campName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Camp Fees:</strong> {camp.campFees}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Scheduled Date and Time:</strong>{" "}
                  {camp.scheduledDateTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Venue Location:</strong> {camp.venueLocation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong> Target Audience:</strong> {camp.targetAudience}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong> Participant Count:</strong>{" "}
                  {participantCounts[camp.campName] || 0}
                </Typography>
              </CardContent>
              <CardActions style={{ marginTop: "auto" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRegister(camp.campName)}
                  style={{ marginRight: "auto" }}
                >
                  Register
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={`/campDetail/${camp.id}`}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Button component={Link} to="/available-camps" variant="outlined">
          See All Camps
        </Button>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Register Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to register for the camp?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              handleRegisterConfirmation(selectedCampForRegistration)
            }
            variant="contained"
            color="primary"
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={handleDialogClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PopularCamps;
