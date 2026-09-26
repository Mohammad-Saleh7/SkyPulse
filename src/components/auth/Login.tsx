import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoginForm from "./LoginForm";
import LoginOptionMenu from "./LoginOptionMenu";
import WeatherAnimation from "./weather-animation/WeatherAnimation";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          bgcolor: "#000",
          color: "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem" },
            fontWeight: 600,
          }}
        >
          {t("loading")}
        </Typography>

        <CircularProgress size={26} sx={{ color: "#fff" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#000",
        px: 2,
        py: 4,

        "&::before": {
          content: '""',
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(33, 150, 243, 0.18)",
          filter: "blur(100px)",
          top: "10%",
          left: "10%",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(156, 39, 176, 0.15)",
          filter: "blur(100px)",
          bottom: "10%",
          right: "10%",
        },
      }}
    >
      <WeatherAnimation />
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 430,
        }}
      >
        <Box
          sx={{
            position: "relative",
            p: { xs: 3, sm: 4.5 },
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            boxShadow:
              "0 25px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <Box sx={{ mb: 4, textAlign: "center", color: "#fff" }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.1rem" },
                fontWeight: 700,
                letterSpacing: "-0.03em",
                mb: 1,
              }}
            >
              {t("login.title")}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.9rem",
              }}
            >
              {t("login.label")}
            </Typography>
          </Box>

          <LoginForm />
        </Box>
      </Box>

      <LoginOptionMenu />
    </Box>
  );
};

export default Login;
