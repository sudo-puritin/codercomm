import * as React from "react";

import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";

import { Link as RounterLink, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Divider } from "@mui/material";

const MainHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleProfileMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>
      <Divider sx={{ boderyStyle: "dashed" }} />
      <MenuItem
        onClick={handleProfileMenuClose}
        to="/"
        component={RounterLink}
        sx={{ mx: 1 }}
      >
        My Profile
      </MenuItem>
      <MenuItem
        onClick={handleProfileMenuClose}
        to="/account"
        component={RounterLink}
        sx={{ mx: 1 }}
      >
        Account settings
      </MenuItem>

      <Divider sx={{ boderyStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ mx: 1, color: "red" }}>
        Sign out
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CoderComm
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              onClick={handleProfileMenuOpen}
            />
          </Box>
          {renderMenu}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainHeader;
