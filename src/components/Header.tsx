import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function Header() {
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FavoriteIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
          <Typography variant="h1" sx={{ fontSize: 18, fontWeight: "regular" }}>
            Application
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
