import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  ArrowBack,
  Home,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, googleSingIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const userInfo = { name, email, role };

    if (!/^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/.test(password)) {
      toast.error(
        "password should be minimum 6 characters, at least 1 capitel letter, 1 number and 1 special characte."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });

        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            console.log("Server Response:", res);

            if (res.data.insertedId) {
              event.target.reset();
              toast.success("Sign Up Success");
              navigate(location?.state ? location.state : "/");
            }
          })
          .catch((error) => {
            console.error("Error in Axios Request:", error);
          });
      })
      .catch((error) => {
        event.target.reset();
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSingIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        role: "Participant",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        toast.success("Sing Up Success");
        navigate(location?.state ? location.state : "/");
      });
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Care Camp | Sing Up</title>
      </Helmet>

      <Box
        sx={{
          my: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="primary" sx={{ my: 2 }}>
          Sing Up
        </Typography>

        <form onSubmit={handleSubmit} style={{ marginTop: 3, width: "100%" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="Name"
                label="Your Name"
                name="name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth id="url" label="Photo Url" name="photo" />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
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

            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-helper-label">
                  SingUp as
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Sing Up As"
                  name="role"
                  required
                >
                  <MenuItem value="Participant">Participant</MenuItem>
                  <MenuItem value="HealthcareProfessional">
                    Healthcare Professional
                  </MenuItem>
                  <MenuItem value="Organizer">Organizer</MenuItem>
                </Select>
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
            Sing Up
          </Button>
        </form>

        <Grid container justifyContent="center">
          <Grid item>
            <Typography
              component={Link}
              to="/login"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              Alredy have an account? LogIn
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ my: 2 }}>
          <Divider orientation="horizontal" sx={{ width: "100%" }}>
            <Typography variant="body2" sx={{ mx: 2 }}>
              Or Sing Up with
            </Typography>
          </Divider>
        </Grid>

        <Grid container spacing={4} sx={{ mx: "auto" }}>
          <Grid item xs={4}>
            <Tooltip title="Sing Up with Google">
              <IconButton onClick={handleGoogleSignIn} sx={{ fontSize: 30 }}>
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
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => window.history.back()}
          sx={{ mt: 2, mr: 2 }}
        >
          <ArrowBack sx={{ mr: 1 }} /> Go Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 2 }}
        >
          Go to Home <Home sx={{ ml: 1 }} />
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
