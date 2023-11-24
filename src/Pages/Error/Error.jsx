import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container sx={{ my: "68px", textAlign: "center" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" color="error">
          404
        </Typography>
        <Typography variant="h4">Not Found</Typography>
      </Box>
      <Typography variant="body1" sx={{ maxWidth: "600px", margin: "auto" }}>
        Oops! The page you're looking for might be unavailable or does not
        exist. Please check the URL or go back to the previous page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 2, mr: 2 }}
      >
        Go to Home
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => window.history.back()}
        sx={{ mt: 2 }}
      >
        Go Back
      </Button>
    </Container>
  );
};

export default ErrorPage;
