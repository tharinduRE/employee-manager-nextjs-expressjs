import { Container, Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ThemeSwitch from "../themeSwitch";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 , fontWeight:600 }}>
              Employee Manager
            </Typography>
            <ThemeSwitch/>
          </Toolbar>
        </AppBar>
      </Box>

      <main>
        <Box paddingBottom={10} paddingTop={5}>
          <Container>{children}</Container>
        </Box>
      </main>
      {/* <Footer /> */}
    </>
  );
}
