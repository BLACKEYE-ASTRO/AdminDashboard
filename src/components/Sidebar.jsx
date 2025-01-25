import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Drawer,
  IconButton,
  Avatar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme, useMediaQuery } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 
  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path, item) => {
    setSelectedItem(item); 
    navigate(path);
    if (isMobile) handleDrawerToggle(); 
  };

  const sidebarContent = (
    <Box
      sx={{
        width: isMobile ? "250px" : "280px",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 15px",
      }}
    >
      {/* Team Info */}
      <Box>
        <Box display="flex" alignItems="center" mb={3} mt={4}>
          <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>T</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Team 1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Free
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Navigation Links */}
        <List>
          <ListItem
            button
            onClick={() => handleNavigation("/dashboard", "dashboard")}
            sx={{
              backgroundColor: selectedItem === "dashboard" ? "#e0f7fa" : "transparent",
              "&:hover": {
                backgroundColor: "#b2ebf2", 
                borderRadius: "8px",
              },
              transition: "background-color 0.3s ease, transform 0.2s", 
              transform: selectedItem === "dashboard" ? "scale(1.05)" : "none", 
            }}
          >
            <DashboardIcon
              sx={{
                color: selectedItem === "dashboard" ? "#00796b" : "#1976d2",
                mr: 2,
              }}
            />
            <ListItemText
              primary="Dashboard"
              sx={{
                fontWeight: selectedItem === "dashboard" ? "bold" : "normal",
              }}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => handleNavigation("/students", "students")}
            sx={{
              backgroundColor: selectedItem === "students" ? "#e0f7fa" : "transparent",
              "&:hover": {
                backgroundColor: "#b2ebf2", // Lighter hover color
                borderRadius: "8px",
              },
              transition: "background-color 0.3s ease, transform 0.2s",
              transform: selectedItem === "students" ? "scale(1.05)" : "none",
            }}
          >
            <PeopleIcon
              sx={{
                color: selectedItem === "students" ? "#00796b" : "#1976d2",
                mr: 2,
              }}
            />
            <ListItemText
              primary="Students Page"
              sx={{
                fontWeight: selectedItem === "students" ? "bold" : "normal",
              }}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleLogout();
              setSelectedItem(null); 
            }}
            sx={{
              backgroundColor: selectedItem === "logout" ? "#e0f7fa" : "transparent",
              "&:hover": {
                backgroundColor: "#b2ebf2",
                borderRadius: "8px",
              },
              transition: "background-color 0.3s ease, transform 0.2s",
              transform: selectedItem === "logout" ? "scale(1.05)" : "none",
            }}
          >
            <ExitToAppIcon
              sx={{
                color: selectedItem === "logout" ? "#00796b" : "#1976d2",
                mr: 2,
              }}
            />
            <ListItemText
              primary="Logout"
              sx={{
                fontWeight: selectedItem === "logout" ? "bold" : "normal",
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            sx={{
              position: "fixed",
              top: "10px",
              left: "10px",
              color: "#1976d2",
              zIndex: 1300,
            }}
            onClick={handleDrawerToggle}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            PaperProps={{
              sx: { boxShadow: "0 2px 8px rgba(0,0,0,0.2)" },
            }}
          >
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        <Box component="nav">{sidebarContent}</Box>
      )}
    </>
  );
};

export default Sidebar;
