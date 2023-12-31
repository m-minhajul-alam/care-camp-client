import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
  CardActions,
} from "@mui/material";
import { useQuery } from "react-query";
import { Box } from "@mui/system";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const AvailableCamps = () => {
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
        <CircularProgress />
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
          color: "red",
        }}
      >
        {error.message}
      </Box>
    );
  }

  return (
    <Container sx={{ my: "28px" }}>
      <Helmet>
        <title>Care Camp | Available Camps</title>
      </Helmet>

      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
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
                  {camp.specializedService}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Healthcare Professionals:</strong>{" "}
                  {camp.healthcareProfessional}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Description:</strong> {camp.description}
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
    </Container>
  );
};

export default AvailableCamps;
