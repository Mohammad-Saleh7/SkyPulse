import React from "react";
import { Box, Typography, type Theme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import WeatherArtwork from "./WeatherArtwork";

import WeatherTemperature from "./WeatherTemperature";
import WeatherStats from "./WeatherStats";

import type { WeatherHeroProps } from "./weather.types";

type WeatherCurrentProps = Pick<
  WeatherHeroProps,
  | "cityName"
  | "day"
  | "date"
  | "hour"
  | "Temperature"
  | "high"
  | "low"
  | "img"
  | "Status"
  | "feels"
> & {
  formatValue: (value: number | string | undefined) => string;
};

const WeatherCurrent: React.FC<WeatherCurrentProps> = ({
  cityName,
  day,
  date,
  hour,
  Temperature,
  high,
  low,
  img,
  Status,
  feels,
  formatValue,
}) => {
  return (
    <Box
      sx={(theme: Theme) => ({
        position: "relative",
        overflow: "hidden",

        flex: 1,
        minWidth: 0,

        minHeight: {
          xs: 330,
          sm: 360,
          md: 390,
        },

        borderRadius: {
          xs: 4,
          md: 5,
        },

        px: {
          xs: 2.5,
          sm: 3,
          md: 4,
        },

        py: {
          xs: 2.5,
          sm: 3,
          md: 3.5,
        },

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",

        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(145deg, rgba(255,255,255,0.085), rgba(255,255,255,0.035))"
            : "linear-gradient(145deg, rgba(247,251,253,0.94), rgba(221,233,240,0.78))",

        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(23,50,74,0.10)",

        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",

        boxShadow:
          theme.palette.mode === "dark"
            ? "0 25px 70px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 22px 65px rgba(38,76,101,0.14), inset 0 1px 0 rgba(255,255,255,0.75)",

        "&::before": {
          content: '""',
          position: "absolute",

          width: 260,
          height: 260,

          top: -140,
          right: -100,

          borderRadius: "50%",

          background:
            theme.palette.mode === "dark"
              ? "rgba(60,190,255,0.13)"
              : "rgba(50,160,215,0.14)",

          filter: "blur(40px)",
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",

          width: 190,
          height: 190,

          bottom: -120,
          left: -80,

          borderRadius: "50%",

          background:
            theme.palette.mode === "dark"
              ? "rgba(110,70,255,0.08)"
              : "rgba(90,135,205,0.08)",

          filter: "blur(40px)",
          pointerEvents: "none",
        },
      })}
    >
      {/* Location */}
      <Box
        sx={(theme: Theme) => ({
          position: "relative",
          zIndex: 1,

          display: "flex",
          alignItems: "center",
          gap: 1,

          width: "fit-content",

          px: 1.5,
          py: 0.75,

          borderRadius: 10,

          background:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.62)",

          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(23,50,74,0.09)",

          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",

          boxShadow:
            theme.palette.mode === "dark"
              ? "none"
              : "0 5px 18px rgba(30,70,95,0.06)",
        })}
      >
        <LocationOnIcon
          sx={(theme: Theme) => ({
            fontSize: 19,

            color: theme.palette.mode === "dark" ? "inherit" : "#0878C9",

            opacity: 0.9,
          })}
        />

        <Typography
          sx={{
            fontSize: {
              xs: "0.85rem",
              sm: "0.9rem",
            },

            fontWeight: 650,
          }}
        >
          {cityName}
        </Typography>
      </Box>

      {/* Day / Date / Time / Weather Image */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          gap: 2,

          mt: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "1.25rem",
                sm: "1.45rem",
                md: "1.55rem",
              },

              fontWeight: 700,

              letterSpacing: "-0.02em",
            }}
          >
            {day}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,

              mt: 0.75,

              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={(theme: Theme) => ({
                fontSize: "0.82rem",

                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.62)"
                    : "#5B7181",
              })}
            >
              {date}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <AccessTimeRoundedIcon
                sx={(theme: Theme) => ({
                  fontSize: 15,

                  color: theme.palette.mode === "dark" ? "inherit" : "#0878C9",

                  opacity: 0.7,
                })}
              />

              <Typography
                sx={(theme: Theme) => ({
                  fontSize: "0.82rem",

                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.62)"
                      : "#5B7181",
                })}
              >
                {hour}
              </Typography>
            </Box>
          </Box>
        </Box>

        <WeatherArtwork status={Status} src={img} size={100} />
      </Box>

      <WeatherTemperature
        temperature={Temperature}
        status={Status}
        formatValue={formatValue}
      />

      <WeatherStats
        high={high}
        low={low}
        feels={feels}
        formatValue={formatValue}
      />
    </Box>
  );
};

export default WeatherCurrent;
