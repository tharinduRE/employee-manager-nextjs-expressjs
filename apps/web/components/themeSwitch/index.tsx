import { DarkMode, LightMode } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function ThemeSwitch() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <DarkMode />
      ) : (
        <LightMode />
      )}
    </IconButton>
  );
}
