import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { HealthAndSafety, Login } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Pages/Providers/AuthProvider";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logOut } = useContext(AuthContext);
  const handelLogOut = () => {
    logOut().then().catch();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <HealthAndSafety
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            CareCamp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/"}
                >
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/availableCamps"}
                >
                  <Typography textAlign="center">Available Camps</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/dashboard"}
                >
                  <Typography textAlign="center">Dashbord</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/contactUs"}
                >
                  <Typography textAlign="center">Contact Us</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CareCamp
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/availableCamps"}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Available Camps
              </Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/dashboard"}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Dashbord
              </Button>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={"/contactUs"}
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Contact Us
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.displayName} src={user?.photoURL} />
                </IconButton>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography>{user?.displayName}</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button onClick={handelLogOut} variant="contained">
                      LogOut
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "white" }}
                >
                  <Login />
                </IconButton>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={"/singup"}>
                      {" "}
                      <Button variant="contained">Sing Up</Button>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={"/login"}>
                      {" "}
                      <Button variant="contained">Login</Button>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
