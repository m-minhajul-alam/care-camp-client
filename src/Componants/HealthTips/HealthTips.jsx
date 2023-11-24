import { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const HealthTips = () => {
  const [healthTips, setHealthTips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/healthTipsData.json");
        const data = await response.json();
        setHealthTips(data);
      } catch (error) {
        console.error("Error fetching health tips data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Health Tips
      </Typography>
      <Grid container spacing={4}>
        {healthTips.map((tip, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {tip.title}
                </Typography>
                <hr />
                <Typography variant="body2">{tip.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HealthTips;
