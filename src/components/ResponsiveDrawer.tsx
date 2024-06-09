import {
  Divider,
  List,
  ListItem,
  Toolbar,
  Typography,
  Box,
  Drawer,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ResponsiveDrawer({ open, onClose }: Props) {
  const routes = [
    { path: "/users", name: "Usuários" },
    { path: "/tourism-agency", name: "Agências de turismo" },
    { path: "/airlines", name: "Companhias aéreas" },
    { path: "/travel-packages", name: "Pacotes de viagens" },
    { path: "/travels", name: "Viagens" },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            iAgent
          </Link>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            onClick={onClose}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>{route.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "background.default",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
