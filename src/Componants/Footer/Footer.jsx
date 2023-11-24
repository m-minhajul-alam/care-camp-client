import { styled } from "@mui/system";
import { Typography, Container, Box, Link } from "@mui/material";

const FooterContainer = styled(Box)({
  backgroundColor: "#333",
  color: "#fff",
  padding: (theme) => theme.spacing(4, 0),
  textAlign: "center",
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container sx={{ py: "12px" }}>
        <Typography variant="h5" component="div" gutterBottom>
          CareCamp
        </Typography>
        <Typography variant="body1" color="inherit" paragraph>
          Revolutionizing the efficiency of organizing and managing medical
          camps.
        </Typography>
        <Typography variant="body2" color="inherit" paragraph>
          © {new Date().getFullYear()} CareCamp. All rights reserved.
        </Typography>
        <Link href="#" color="inherit" underline="hover">
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link href="#" color="inherit" underline="hover">
          Terms of Service
        </Link>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
