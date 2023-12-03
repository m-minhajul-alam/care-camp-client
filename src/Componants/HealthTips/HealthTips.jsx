import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "react-query";
import { Box } from "@mui/system";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const HealthTips = () => {
  const axiosPublic = useAxiosPublic();

  const {
    isPending,
    isError,
    error,
    data: healthTips,
  } = useQuery({
    queryKey: ["healthTips"],
    queryFn: async () => {
      const res = await axiosPublic.get("/healthTips");
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
    <Container sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Health Tips
      </Typography>
      <Grid container spacing={4}>
        {healthTips &&
          healthTips?.map((tip, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
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
