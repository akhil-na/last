import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}> {/* blue Navbar */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            BlogApp
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/add">
            Add
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
