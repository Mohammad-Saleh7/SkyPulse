import React from "react";
import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { WeatherStatsProps } from "./weather.types";

const WeatherStats: React.FC<WeatherStatsProps> = ({
  high,
  low,
  feels,
  formatValue,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,

        display: "flex",
        alignItems: "center",

        gap: 1,

        mt: 1.5,
      }}
    >
      <WeatherStat label={t("weather.high")} value={`${formatValue(high)} °`} />

      <WeatherStat label={t("weather.low")} value={`${formatValue(low)} °`} />

      <Box
        sx={{
          marginInlineStart: "auto",
          textAlign: "end",
        }}
      >
        <Typography
          sx={(theme: Theme) => ({
            fontSize: "0.72rem",

            color:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.50)"
                : "#668091",
          })}
        >
          {t("weather.feelsLike")}
        </Typography>

        <Typography
          sx={{
            fontWeight: 750,
            fontSize: "0.9rem",
          }}
        >
          {formatValue(feels)} °
        </Typography>
      </Box>
    </Box>
  );
};

type WeatherStatProps = {
  label: string;
  value: string;
};

const WeatherStat: React.FC<WeatherStatProps> = ({ label, value }) => {
  return (
    <Box
      sx={(theme: Theme) => ({
        px: 1.25,
        py: 0.6,

        borderRadius: 2.5,

        background:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.055)"
            : "rgba(255,255,255,0.60)",

        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(23,50,74,0.08)",

        boxShadow:
          theme.palette.mode === "dark"
            ? "none"
            : "0 5px 18px rgba(30,70,95,0.05)",
      })}
    >
      <Typography
        sx={(theme: Theme) => ({
          fontSize: "0.78rem",

          color:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.58)"
              : "#60798A",
        })}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontWeight: 750,
          fontSize: "0.9rem",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default WeatherStats;
