import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import UsersList from "./UsersList";
import UsersTodos from "./UsersTodos";

const drawerWidth = 180;

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [showTodo, setShowTodo] = useState(false);

  const listCall = () => {
    setShow(true);
    setShowTodo(false);
  };

  const todoCall = () => {
    setShowTodo(true);
    setShow(false);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
        </Box>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <h1>Admin</h1>
          <Toolbar />
          <Divider />
          <List>
            <p>
              <button onClick={listCall}>Users List</button>
            </p>
            <p>
              <button onClick={todoCall}>Users Todos</button>
            </p>
          </List>
          <Divider />
        </Drawer>
      </Box>

      <div>
        <Box>{show && <UsersList />}</Box>
      </div>
      <div>
        <Box>{showTodo && <UsersTodos />}</Box>
      </div>
    </>
  );
};

export default Sidebar;
