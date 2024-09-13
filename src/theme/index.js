import React from "react";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import customizeComponents from "./customizations";

const PRIMARY = {
  lighter: "#ffcdd2",
  light: "#ef5350",
  main: "#e53935",
  dark: "#c62828",
  darker: "#b71c1c",
  constrastTest: "#FFF",
};

const SECONDARY = {
  lighter: "#b2dfdb",
  light: "#4db6ac",
  main: "#009688",
  dark: "#00695c",
  darker: "#004d40",
  constrastTest: "#FFF",
};

const SUCCESS = {
  lighter: "#c8e6c9",
  light: "#81c784",
  main: "#43a047",
  dark: "#2e7d32",
  darker: "#1b5e20",
  constrastTest: "#FFF",
};

const GREY = {
  0: "#FFFFFF",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
      text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
      background: { paper: "#fff", default: "##fff", neutral: GREY[200] },
      action: {
        active: GREY[600],
        hover: GREY[500_8],
        selected: GREY[500_16],
        disabled: GREY[500_80],
        disabledBackground: GREY[500_24],
        focus: GREY[500_24],
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
      },
    },
    shape: { borderRadius: 10 },
  };
  const theme = createTheme(themeOptions);

  theme.components = customizeComponents(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
