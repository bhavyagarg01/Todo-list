import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const UserHeader = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 220 }}
          ></IconButton>

          <Button color="inherit" onClick={logOut}>
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default UserHeader;
