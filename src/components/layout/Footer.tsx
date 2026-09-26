import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const date = new Date();

  const locale = i18n.language === "fa" ? "fa-IR" : "en-US";

  const formattedDate = date.toLocaleString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Stack
      component="footer"
      sx={(theme) => ({
        position: "relative",
        width: "100%",
        mt: {
          xs: 2.5,
          md: 3,
        },

        overflow: "hidden",

        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))"
            : "linear-gradient(145deg, rgba(255,255,255,0.72), rgba(255,255,255,0.48))",

        borderTop:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,52,100,0.06)",

        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",

        boxShadow:
          theme.palette.mode === "dark"
            ? "0 -15px 50px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.025)"
            : "0 -12px 40px rgba(30,80,110,0.06)",

        color:
          theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary,

        "&::before": {
          content: '""',
          position: "absolute",
          width: 240,
          height: 140,
          left: "10%",
          bottom: -100,
          borderRadius: "50%",
          background:
            theme.palette.mode === "dark"
              ? "rgba(70,190,255,0.07)"
              : "rgba(60,170,230,0.06)",
          filter: "blur(45px)",
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 180,
          height: 120,
          right: "8%",
          top: -90,
          borderRadius: "50%",
          background:
            theme.palette.mode === "dark"
              ? "rgba(76,223,232,0.05)"
              : "rgba(76,180,220,0.05)",
          filter: "blur(40px)",
          pointerEvents: "none",
        },
      })}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,

          mx: {
            xs: 2,
            sm: 3,
            md: 5,
          },

          py: {
            xs: 2,
            sm: 2.25,
          },

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          gap: 2,

          flexWrap: "wrap",
        }}
      >
        {/* Copyright */}
        <Typography
          sx={(theme) => ({
            fontSize: {
              xs: "0.72rem",
              sm: "0.78rem",
            },

            fontWeight: 500,

            opacity: 0.58,

            color:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.8)"
                : theme.palette.text.primary,
          })}
        >
          {t("footer.rights")}
        </Typography>

        {/* Footer information */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: {
              xs: 1.5,
              sm: 2.5,
              md: 3,
            },

            flexWrap: "wrap",
          }}
        >
          {/* Contact */}
          <Link
            href="mailto:abbasisaleh895@gmail.com"
            underline="none"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              gap: 0.75,

              color:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.72)"
                  : theme.palette.text.primary,

              fontSize: {
                xs: "0.72rem",
                sm: "0.78rem",
              },

              transition: "color 0.2s ease, transform 0.2s ease",

              "&:hover": {
                color: theme.palette.mode === "dark" ? "#4CDFE8" : "#007FFF",

                transform: "translateY(-1px)",
              },
            })}
          >
            <MailOutlineIcon
              sx={{
                fontSize: {
                  xs: 16,
                  sm: 18,
                },
              }}
            />

            {t("footer.contact")}
          </Link>

          {/* Date */}
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              gap: 0.75,

              color:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.58)"
                  : theme.palette.text.primary,

              fontSize: {
                xs: "0.72rem",
                sm: "0.78rem",
              },
            })}
          >
            <CalendarMonthOutlinedIcon
              sx={{
                fontSize: {
                  xs: 16,
                  sm: 18,
                },
                opacity: 0.8,
              }}
            />

            <Typography
              component="span"
              sx={{
                fontSize: "inherit",
                opacity: 0.8,
                whiteSpace: "nowrap",
              }}
            >
              {formattedDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default Footer;
