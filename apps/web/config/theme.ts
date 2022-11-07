import { PaletteMode } from "@mui/material";
import { deepPurple, purple } from "@mui/material/colors";

const theme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        primary: {
          main: purple[900],
        },
      }
      : {
        primary: deepPurple,
      }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
