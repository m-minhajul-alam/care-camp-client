import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
  Grid,
  LinearProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import { Box } from "@mui/system";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const PopularCamps = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    data: camps,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosPublic.get("/camps");
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
    <Container sx={{ my: "68px" }}>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Popular Medical Camps
      </Typography>

      <Grid container spacing={2}>
        {camps?.slice(0, 6).map((camp) => (
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
                  <strong>Camp Fees:</strong> ${camp.campFees}
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
              </CardContent>
              <CardActions sx={{ marginTop: "auto" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  style={{ width: "100%" }}
                  to={`/campDetails/${camp._id}`}
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
        <Button component={Link} to="/availableCamps" variant="contained">
          See All Camps
        </Button>
      </div>
    </Container>
  );
};

export default PopularCamps;
