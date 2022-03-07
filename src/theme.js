import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#343434",
    },
    secondary: {
      main: "#EF7CFF",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: "#C0FF76",
    },
    greenDarker: {
      main: "#006600",
    },
    greenOriginal: {
      main: "#008000",
    },
    greenLighter: {
      main: "#00a000",
    },
    inverted: {
      main: "#ff7fff",
    },
    americanRose: {
      main: "#ff033e",
    },
    blond: {
      main: "#faf0be",
    },

  },
});

export default theme;
