import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",

        primary: {
          main: "#0878C9",
        },

        secondary: {
          main: "#39B8C6",
        },

        background: {
          default: "#E8F0F5",
          lightPaper: "#DCE8EF",
          paper: "#F4F8FA",
        },

        navbar: {
          default: "#E7F0F5",
          dNav: "#E7F0F5",
        },

        text: {
          primary: "#17324A",
          secondary: "#557084",
        },

        divider: "rgba(23, 50, 74, 0.10)",
      },
    },

    dark: {
      palette: {
        mode: "dark",

        background: {
          default: "#151d32",
          darkPaper: "#292f45",
        },

        navbar: {
          default: "#151d32",
          dNav: "#151d32",
        },
      },
    },
  },

  defaultColorScheme: "dark",
});

export default theme;
