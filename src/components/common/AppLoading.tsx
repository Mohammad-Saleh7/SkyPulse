import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type AppLoadingProps = {
  fullscreen?: boolean;
  overlay?: boolean;
};

const AppLoading: React.FC<AppLoadingProps> = ({
  fullscreen = true,
  overlay = false,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={(theme) => ({
        position: overlay ? "absolute" : "fixed",
        inset: 0,
        zIndex: 50,
        minHeight: fullscreen ? "100vh" : 260,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,

        background: overlay
          ? theme.palette.mode === "dark"
            ? "rgba(5, 12, 24, 0.48)"
            : "rgba(238, 245, 249, 0.58)"
          : theme.palette.mode === "dark"
            ? "#000000"
            : "#eef5f9",

        backdropFilter: overlay ? "blur(10px)" : "none",
        WebkitBackdropFilter: overlay ? "blur(10px)" : "none",

        transition: "all 0.25s ease",
      })}
    >
      <Box
        sx={(theme) => ({
          minWidth: {
            xs: 180,
            sm: 220,
          },

          px: {
            xs: 3,
            sm: 4,
          },

          py: {
            xs: 2.5,
            sm: 3,
          },

          borderRadius: 4,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,

          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))"
              : "linear-gradient(145deg, rgba(255,255,255,0.78), rgba(255,255,255,0.52))",

          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.09)"
              : "1px solid rgba(23,50,74,0.08)",

          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",

          boxShadow:
            theme.palette.mode === "dark"
              ? "0 25px 80px rgba(0,0,0,0.28)"
              : "0 25px 80px rgba(38,76,101,0.12)",
        })}
      >
        <CircularProgress
          size={34}
          thickness={3}
          sx={(theme) => ({
            color: theme.palette.mode === "dark" ? "#4CDFE8" : "#0878C9",
          })}
        />

        <Typography
          sx={(theme) => ({
            fontWeight: 600,
            fontSize: "0.9rem",
            color: theme.palette.text.primary,
            opacity: 0.78,
          })}
        >
          {t("loading")}
        </Typography>
      </Box>
    </Box>
  );
};

export default AppLoading;
