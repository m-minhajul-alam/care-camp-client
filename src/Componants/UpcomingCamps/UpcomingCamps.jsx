import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
} from "@mui/material";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "react-query";
import { Box } from "@mui/system";

const UpcomingCamps = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    data: upcomingCamps,
  } = useQuery({
    queryKey: ["upcomingCamps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/upcomingCamps");
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
        <LinearProgress />
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
        }}
      >
        {error.message}
      </Box>
    );
  }

  return (
    <Container sx={{ my: "68px", textAlign: "center" }}>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Upcoming Camps
      </Typography>

      <Grid container spacing={3}>
        {upcomingCamps
          ?.sort(
            (a, b) =>
              new Date(b.scheduledDateTime) - new Date(a.scheduledDateTime)
          )
          .slice(0, 6)
          .map((camp, index) => (
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    <strong> Date:</strong> {camp.scheduledDateTime}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong> Venue:</strong> {camp.venueLocation}
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
