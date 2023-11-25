import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  Box,
  Tooltip,
  TextField,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSocialLogin = () => {};

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    logIn(email, password)
      .then((result) => {
        event.target.reset();
        toast.success("Login Success");
        console.log(result);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="primary" sx={{ my: 2 }}>
          Log in
        </Typography>

        <form onSubmit={handleSubmit} style={{ marginTop: 3, width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  name="password"
                  required
                />
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
        </form>

        <Grid container justifyContent="center">
          <Grid item>
            <Typography
              component={Link}
              to="/singup"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              Do not have an account? Sing up
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ my: 2 }}>
          <Divider orientation="horizontal" sx={{ width: "100%" }}>
            <Typography variant="body2" sx={{ mx: 2 }}>
              Or log in with
            </Typography>
          </Divider>
        </Grid>

        <Grid container spacing={4} sx={{ mx: "auto" }}>
          <Grid item xs={4}>
            <Tooltip title="Log in with Google">
              <IconButton
                onClick={() => handleSocialLogin}
                sx={{ fontSize: 30 }}
              >
                <GoogleIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Coming Soon">
              <IconButton sx={{ fontSize: 30 }} disabled>
                <FacebookIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title="Coming Soon">
              <IconButton sx={{ fontSize: 30 }} disabled>
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
