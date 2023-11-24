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
} from "@mui/material";

const PopularCamps = () => {
  const [camps, setCamps] = useState([]);
  const [participantCounts, setParticipantCounts] = useState({});

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
    setParticipantCounts((prevCounts) => ({
      ...prevCounts,
      [campName]: (prevCounts[campName] || 0) + 1,
    }));
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
            <Card sx={{ height: "100%" }}>
              <img
                src={camp.image}
                alt={camp.campName}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {camp.campName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Camp Fees: {camp.campFees}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scheduled Date and Time: {camp.scheduledDateTime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Venue Location: {camp.venueLocation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Target Audience: {camp.targetAudience}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Participant Count: {participantCounts[camp.campName] || 0}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleRegister(camp.campName)}>
                  Register
                </Button>
                <Button component={Link} to={`/camp-details/${camp.campName}`}>
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
    </Container>
  );
};

export default PopularCamps;
