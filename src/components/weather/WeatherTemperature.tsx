import React from "react";
import { Box, Typography, type Theme } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

import type { WeatherTemperatureProps } from "./weather.types";

const WeatherTemperature: React.FC<WeatherTemperatureProps> = ({
  temperature,
  status,
  formatValue,
}) => {
  const { mode } = useColorScheme();

  const isDarkMode = mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <Typography
          sx={(theme: Theme) => ({
            fontSize: {
              xs: "3.2rem",
              sm: "4rem",
              md: "4.5rem",
            },
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: "-0.065em",
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #ffffff 10%, #8eeaff 90%)"
                : "linear-gradient(135deg, #123B5A 0%, #0878C9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: isDarkMode
              ? "none"
              : "drop-shadow(0 2px 8px rgba(8,120,201,0.10))",
          })}
        >
          {formatValue(temperature)}°C
        </Typography>
      </Box>

      <Typography
        sx={(theme: Theme) => ({
          mt: 0.5,
          fontSize: {
            xs: "0.9rem",
            sm: "0.95rem",
          },
          fontWeight: 600,
          color:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.75)"
              : "#3E5A6D",
        })}
      >
        {status}
      </Typography>
    </Box>
  );
};

export default WeatherTemperature;
