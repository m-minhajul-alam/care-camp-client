import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <Container sx={{ my: "28px" }}>
      <Helmet>
        <title>Care Camp | Contact Us</title>
      </Helmet>

      <Typography variant="h4" align="center" color="primary" sx={{ mb: 4 }}>
        Contact Us
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Our Address
              </Typography>
              <hr />
              <Typography variant="body1">
                123 Main Street,
                <br />
                Cityville, Country
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <hr />
              <Typography variant="body1">
                Email: info@carecamp.com
                <br />
                Phone: +1 234 567 890
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Support
              </Typography>
              <hr />
              <Typography variant="body1">
                For assistance or inquiries, please contact our customer support
                team.
                <br />
                Email: support@carecamp.com
                <br />
                Phone: +1 234 567 891
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Business Inquiries
              </Typography>
              <hr />
              <Typography variant="body1">
                For business-related inquiries and partnerships, please reach
                out to our business development team.
                <br />
                Email: business@carecamp.com
                <br />
                Phone: +1 234 567 892
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
