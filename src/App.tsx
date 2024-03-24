import { Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import Index from "./components";
import Header from "./components/Header";
import Form from "./components/form";
const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
      // xxl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#f44336",
    },
    secondary: {
      main: "#878787",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#F5F5F5", height: "100vh" }}>
        <Header />
        <Container maxWidth="xl">
          <Grid
            columns={{ xs: 1, sm: 1, md: 12, lg: 12 }}
            container
            spacing={6}
          >
            <Grid item xs={1} sm={1} md={4} lg={3}>
              <Form />
            </Grid>
            <Grid item xs={1} sm={1} md={8} lg={9}>
              <Index />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
