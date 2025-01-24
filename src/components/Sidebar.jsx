import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Box, List, ListItem, ListItemText, Divider, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <Box
      component="nav"
      sx={{
        width: "200px",
        minHeight: "100vh",
        borderRight: "1px solid #444",
        padding: "20px",
        backgroundColor: "#03071e",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 2,
          color: "#ffffff",
          fontWeight: "bold", 
        }}
        onClick={() => navigate("/dashboard")}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <DashboardIcon sx={{ mr: 1 }} />
          Dashboard
        </Box>
      </Typography>
      <Divider sx={{ borderColor: "#555" }} />
      <List>
        <ListItem
          button
          onClick={() => navigate("/students")}
          sx={{
            '&:hover': { backgroundColor: "#495057", color: "#ffffff" },
            '& .MuiListItemText-primary': { color: "#ffffff" },
          }}
        >
          <PeopleIcon sx={{ color: "#ffffff", mr: 2 }} />
          <ListItemText primary="Students Page" />
        </ListItem>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            '&:hover': { backgroundColor: "#495057", color: "#ffffff" },
            '& .MuiListItemText-primary': { color: "#ffffff" },
          }}
        >
          <ExitToAppIcon sx={{ color: "#ffffff", mr: 2 }} />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
