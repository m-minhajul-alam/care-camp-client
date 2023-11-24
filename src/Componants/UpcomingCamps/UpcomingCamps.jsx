import { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";

const UpcomingCamps = () => {
  const [upcomingCamps, setUpcomingCamps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/upcomingCampsData.json");
        const data = await response.json();
        setUpcomingCamps(data);
      } catch (error) {
        console.error("Error fetching upcoming camps data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ my: "68px", textAlign: "center" }}>
      <Typography
        variant="h4"
        sx={{
          font: "700px",
          mb: "26px",
          color: "#00A19D",
        }}
        gutterBottom
      >
        Upcoming Camps
      </Typography>
      <Grid container spacing={3}>
        {upcomingCamps?.map((camp, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <img
                src={camp.image}
                alt={camp.campName}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {camp.campName}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Date: {camp.scheduledDateTime}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Venue: {camp.venueLocation}
                </Typography>
                {/* Add more details as needed */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UpcomingCamps;
