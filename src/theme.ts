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
          // صفحه دیگر سفید خالص نیست
          default: "#E8F0F5",

          // برای سطوح و کارت‌های روشن
          lightPaper: "#DCE8EF",

          // در صورت استفاده توسط MUI
          paper: "#F4F8FA",
        },

        navbar: {
          default: "#E7F0F5",
          dNav: "#E7F0F5",
        },

        text: {
          // خوانایی بالا، ولی نه مشکی
          primary: "#17324A",

          // متن‌های ثانویه
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
});

export default theme;
