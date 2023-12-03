import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

const Payment = () => {
  return (
    <Container>
      <Helmet>
        <title>Care Camp | Dashboard | Payment</title>
      </Helmet>

      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Payment
      </Typography>
    </Container>
  );
};

export default Payment;
