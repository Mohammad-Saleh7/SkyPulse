import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const NavbarBrand: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: {
          xs: 0.75,
          sm: 1,
        },
        flexShrink: 0,
      }}
    >
      <Box
        sx={(theme) => ({
          width: {
            xs: 44,
            sm: 50,
            md: 54,
          },
          height: {
            xs: 44,
            sm: 50,
            md: 54,
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",

          background:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.055)"
              : "rgba(255,255,255,0.55)",

          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,52,100,0.06)",

          boxShadow:
            theme.palette.mode === "dark"
              ? "0 0 25px rgba(50,180,255,0.07)"
              : "0 5px 20px rgba(30,80,110,0.07)",

          overflow: "hidden",
        })}
      >
        <Box
          component="img"
          src="/nav.png"
          alt="Weather App"
          sx={{
            width: {
              xs: 38,
              sm: 44,
              md: 48,
            },
            height: {
              xs: 38,
              sm: 44,
              md: 48,
            },
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Typography
        variant="body1"
        noWrap
        sx={(theme) => ({
          fontSize: {
            xs: "0.78rem",
            sm: "0.9rem",
            md: "1rem",
          },
          fontWeight: 600,

          color:
            theme.palette.mode === "dark" ? "rgba(255,255,255,0.9)" : "#003464",
        })}
      >
        {t("app.title")}
      </Typography>
    </Box>
  );
};

export default NavbarBrand;
