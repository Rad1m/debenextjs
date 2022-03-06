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
    success:{
      main: "#C0FF76",
    },
  },
})

export default theme;
