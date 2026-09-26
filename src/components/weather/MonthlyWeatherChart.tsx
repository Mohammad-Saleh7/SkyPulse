import React from "react";
import { Box, Typography, type Theme } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { useColorScheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import type { MonthlyPoint } from "./weather.types";

type MonthlyWeatherChartProps = {
  monthlyData?: MonthlyPoint[];
};

const MonthlyWeatherChart: React.FC<MonthlyWeatherChartProps> = ({
  monthlyData = [],
}) => {
  const { t } = useTranslation();
  const { mode } = useColorScheme();

  const data = monthlyData;

  const chartWidth = 704;
  const chartHeight = 170;
  const chartPaddingX = 16;
  const chartPaddingY = 18;

  const values = data.map((item) => Number(item.avgTemp ?? 0));

  const minValue = values.length > 0 ? Math.min(...values) : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 0;

  const range = maxValue - minValue === 0 ? 1 : maxValue - minValue;

  const points = data.map((item, index) => {
    const x =
      data.length <= 1
        ? chartWidth / 2
        : chartPaddingX +
          (index * (chartWidth - chartPaddingX * 2)) / (data.length - 1);

    const value = Number(item.avgTemp ?? 0);

    const y =
      chartHeight -
      chartPaddingY -
      ((value - minValue) / range) * (chartHeight - chartPaddingY * 2);

    return {
      x,
      y,
      value,
      label: item.label ?? item.month ?? "",
    };
  });

  const linePath = points
    .map((point, index) => {
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    })
    .join(" ");

  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`
      : "";

  return (
    <Box
      sx={(theme: Theme) => ({
        position: "relative",
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
        borderRadius: 5,

        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },

        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018))"
            : "linear-gradient(145deg, rgba(247,251,253,0.94), rgba(221,233,240,0.78))",

        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(23,50,74,0.10)",

        boxShadow:
          theme.palette.mode === "dark"
            ? "0 22px 65px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.035)"
            : "0 22px 65px rgba(38,76,101,0.12), inset 0 1px 0 rgba(255,255,255,0.75)",

        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",

        minHeight: {
          xs: 330,
          sm: 350,
          md: 370,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          width: 260,
          height: 180,
          right: -100,
          top: -100,
          borderRadius: "50%",
          background:
            theme.palette.mode === "dark"
              ? "rgba(76,223,232,0.055)"
              : "rgba(50,160,215,0.09)",
          filter: "blur(50px)",
          pointerEvents: "none",
        },
      })}
    >
      {/* Header */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: {
            xs: 2,
            sm: 2.5,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: 0,
          }}
        >
          <Box
            sx={(theme) => ({
              flexShrink: 0,
              width: {
                xs: 36,
                sm: 38,
              },
              height: {
                xs: 36,
                sm: 38,
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(76,223,232,0.08)"
                  : "rgba(8,120,201,0.08)",
              color: theme.palette.mode === "dark" ? "#4CDFE8" : "#0878C9",
            })}
          >
            <TrendingUpRoundedIcon sx={{ fontSize: 21 }} />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                },
                fontWeight: 700,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {t("monthlyWeather")}
            </Typography>

            <Typography
              sx={(theme) => ({
                mt: 0.25,
                fontSize: {
                  xs: "0.68rem",
                  sm: "0.72rem",
                },
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.48)"
                    : "rgba(23,50,74,0.55)",
                whiteSpace: "nowrap",
              })}
            >
              {t("averageTemperature")}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Empty state */}
      {data.length === 0 ? (
        <Box
          sx={{
            minHeight: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={(theme) => ({
              fontSize: "0.85rem",
              color:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(23,50,74,0.5)",
            })}
          >
            {t("noData")}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            pb: 1,

            /*
             * On small screens the chart gets a fixed usable width,
             * so all 12 months remain readable.
             *
             * On larger screens it fills the card.
             */
            "&::-webkit-scrollbar": {
              height: 5,
            },

            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },

            "&::-webkit-scrollbar-thumb": {
              borderRadius: 10,
              background:
                mode === "dark"
                  ? "rgba(255,255,255,0.16)"
                  : "rgba(23,50,74,0.12)",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              minWidth: {
                xs: 620,
                sm: 680,
                md: "100%",
              },
            }}
          >
            {/* Chart */}
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              width="100%"
              height="180"
              preserveAspectRatio="none"
              role="img"
              aria-label={t("monthlyWeather")}
              style={{
                display: "block",
                overflow: "visible",
              }}
            >
              <defs>
                <linearGradient
                  id="monthly-area-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={mode === "dark" ? "#4CDFE8" : "#0878C9"}
                    stopOpacity="0.22"
                  />

                  <stop
                    offset="100%"
                    stopColor={mode === "dark" ? "#4CDFE8" : "#0878C9"}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path d={areaPath} fill="url(#monthly-area-gradient)" />

              <path
                d={linePath}
                fill="none"
                stroke={mode === "dark" ? "#4CDFE8" : "#0878C9"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {points.map((point, index) => (
                <circle
                  key={`${point.label}-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill={mode === "dark" ? "#4CDFE8" : "#0878C9"}
                  stroke={mode === "dark" ? "#13263A" : "#F4F8FA"}
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* Month labels */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${points.length}, minmax(0, 1fr))`,
                alignItems: "center",
                gap: 0,
                px: 0.5,
                mt: 0.25,
              }}
            >
              {points.map((point, index) => (
                <Typography
                  key={`${point.label}-${index}`}
                  sx={(theme) => ({
                    minWidth: 0,
                    textAlign: "center",

                    fontSize: {
                      xs: "0.65rem",
                      sm: "0.72rem",
                      md: "0.74rem",
                    },

                    lineHeight: 1.2,
                    fontWeight: 600,

                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.55)"
                        : "rgba(23,50,74,0.58)",

                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  })}
                >
                  {point.label}
                </Typography>
              ))}
            </Box>

            {/* Temperature values */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${points.length}, minmax(0, 1fr))`,
                alignItems: "center",
                gap: 0,
                px: 0.5,
                mt: 1,
              }}
            >
              {points.map((point, index) => (
                <Typography
                  key={`value-${point.label}-${index}`}
                  sx={(theme) => ({
                    minWidth: 0,
                    textAlign: "center",

                    fontSize: {
                      xs: "0.68rem",
                      sm: "0.75rem",
                    },

                    lineHeight: 1.2,
                    fontWeight: 700,

                    color:
                      theme.palette.mode === "dark" ? "#ffffff" : "#17324A",

                    whiteSpace: "nowrap",
                  })}
                >
                  {point.value}°
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MonthlyWeatherChart;
