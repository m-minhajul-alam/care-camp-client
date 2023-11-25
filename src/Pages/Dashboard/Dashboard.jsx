import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import {
  Checklist,
  Feedback,
  Home,
  Payment,
  Person,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const drawerWidth = 240;

const Dashboard = (props) => {
  const { user } = useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />

      <Divider />
      {/* Organizer Dashboard */}
      {user && (
        <List>
          {/* Organizer Profile */}
          <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      )}

      {/* Health Care Dashboard */}
      {user && (
        <List>
          {/* Health Care Profile */}
          <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      )}

      {/* Participant Dashboard */}
      {user && (
        <List>
          {/* Participant Profile */}
          <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* Registered Camps */}
          <Link
            to={"/dashboard/registeredCamps"}
            style={{ textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Checklist />
                </ListItemIcon>
                <ListItemText primary="Registered Camps" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* Payment History */}
          <Link
            to={"/dashboard/paymentHistory"}
            style={{ textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Payment />
                </ListItemIcon>
                <ListItemText primary="Payment History" />
              </ListItemButton>
            </ListItem>
          </Link>

          {/* Feedback */}
          <Link to={"/dashboard/feedback"} style={{ textDecoration: "none" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Feedback />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      )}

      <Divider />

      <List>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome Back {user?.displayName}!
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
