import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";

const AvailableCamps = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await fetch("/campData.json");
        const data = await response.json();
        setCamps(data);
      } catch (error) {
        console.error("Error fetching camp data:", error);
      }
    };

    fetchCamps();
  }, []);

  const joinCamp = (campId) => {
    console.log(`Joining camp with ID: ${campId}`);
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
        Available Camps
      </Typography>
      <Grid container spacing={3}>
        {camps?.map((camp) => (
          <Grid
            item
            key={camp.id}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <img
                src={camp.image}
                alt={camp.campName}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {camp.campName}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  <strong>Date:</strong>{" "}
                  {new Date(camp.scheduledDateTime).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Venue:</strong> {camp.venueLocation}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Target Audience:</strong> {camp.targetAudience}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Specialized Services:</strong>{" "}
                  {camp.specializedServices.join(", ")}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Healthcare Professionals:</strong>{" "}
                  {camp.healthcareProfessionals.join(", ")}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Description:</strong> {camp.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={() => joinCamp(camp.id)}
                component={Link}
                to={`/camps/${camp.id}`}
                sx={{ mt: "auto" }}
              >
                Join Camp
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AvailableCamps;
