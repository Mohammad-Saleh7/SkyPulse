import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
  type Theme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { useColorScheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

type MonthlyPoint = {
  month?: string;
  label?: string;
  avgTemp?: number;
};

type WeatherHeroProps = {
  cityName: string;
  day: string;
  date: string;
  hour: string;
  Temperature: number | string;
  high: number | string;
  low: number | string;
  img: string;
  Status?: string;
  feels?: number | string;
  monthlyData?: MonthlyPoint[];
};

const WeatherHero: React.FC<WeatherHeroProps> = ({
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
  monthlyData = [],
}) => {
  const { t, i18n } = useTranslation();
  const { mode } = useColorScheme();

  const [loading, setLoading] = useState<boolean>(true);

  const isDarkMode = mode === "dark";

  const numberFormatter = new Intl.NumberFormat(
    i18n.language === "fa" ? "fa-IR" : "en-US",
  );

  const formatValue = (value: number | string | undefined): string => {
    return typeof value === "number"
      ? numberFormatter.format(value)
      : (value ?? "");
  };

  const months = monthlyData;

  const values = months
    .map((month) => month?.avgTemp)
    .filter((value): value is number => value != null);

  const chartWidth = 704;
  const chartHeight = 150;
  const chartPadding = 12;

  const step =
    months.length > 1
      ? (chartWidth - 2 * chartPadding) / (months.length - 1)
      : 0;

  const minValue = values.length ? Math.min(...values) : 0;

  const maxValue = values.length ? Math.max(...values) : 0;

  const normalizeY = (value: number): number =>
    maxValue === minValue
      ? 0.5
      : 1 - (value - minValue) / (maxValue - minValue);

  const points =
    months.length && values.length
      ? months
          .map((month, index) => {
            const normalizedY =
              month.avgTemp != null ? normalizeY(month.avgTemp) : 0.5;

            return `${chartPadding + index * step},${
              chartPadding + normalizedY * (chartHeight - 2 * chartPadding)
            }`;
          })
          .join(" ")
      : "";

  const gradient = (
    <linearGradient id="monthlyWeatherGradient" x1="0" y1="0" x2="0" y2="1">
      <stop
        offset="0%"
        stopColor={isDarkMode ? "#4CDFE8" : "#0878C9"}
        stopOpacity={0.2}
      />

      <stop
        offset="100%"
        stopColor={isDarkMode ? "#7947F7" : "#39B8C6"}
        stopOpacity={0.02}
      />
    </linearGradient>
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            minHeight: 360,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <CircularProgress size={30} thickness={3} />

          <Typography
            sx={{
              fontWeight: 600,
              opacity: 0.75,
            }}
          >
            {t("loading")}
          </Typography>
        </Box>
      ) : (
        <Container
          maxWidth="lg"
          sx={{
            px: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <Stack
            sx={(theme: Theme) => ({
              flexDirection: {
                xs: "column",
                md: "row",
              },

              gap: {
                xs: 2,
                md: 2.5,
              },

              mt: {
                xs: 2,
                sm: 3,
                md: 4,
              },

              color: theme.palette.mode === "dark" ? "#ffffff" : "#17324A",
            })}
          >
            {/* ============================================================ */}
            {/* Current Weather Card                                         */}
            {/* ============================================================ */}

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

                    color:
                      theme.palette.mode === "dark" ? "inherit" : "#0878C9",

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

              {/* Main weather */}
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

                          color:
                            theme.palette.mode === "dark"
                              ? "inherit"
                              : "#0878C9",

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

                {/* Weather image */}
                <Box
                  sx={(theme: Theme) => ({
                    width: {
                      xs: 80,
                      sm: 100,
                    },

                    height: {
                      xs: 80,
                      sm: 100,
                    },

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: "50%",

                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.55)",

                    border:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(23,50,74,0.07)",

                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 0 35px rgba(80,190,255,0.10)"
                        : "0 8px 30px rgba(35,120,170,0.12)",

                    flexShrink: 0,
                  })}
                >
                  <img
                    src={img}
                    alt={Status || "weather"}
                    style={{
                      width: "78%",
                      height: "78%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>

              {/* Temperature */}
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
                    gap: 1,
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

                      // Dark: همان حس قبلی
                      // Light: رنگ کاملاً خوانا
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #ffffff 10%, #8eeaff 90%)"
                          : "linear-gradient(135deg, #123B5A 0%, #0878C9 100%)",

                      WebkitBackgroundClip: "text",

                      WebkitTextFillColor: "transparent",

                      // برای جلوگیری از محو شدن در Light
                      filter:
                        theme.palette.mode === "dark"
                          ? "none"
                          : "drop-shadow(0 2px 8px rgba(8,120,201,0.10))",
                    })}
                  >
                    {formatValue(Temperature)}
                  </Typography>

                  <Typography
                    sx={(theme: Theme) => ({
                      fontSize: {
                        xs: "1.3rem",
                        sm: "1.5rem",
                      },

                      fontWeight: 700,

                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.65)"
                          : "#476174",
                    })}
                  >
                    °C
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
                  {Status}
                </Typography>
              </Box>

              {/* High / Low / Feels */}
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
                    {t("weather.high")}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 750,
                      fontSize: "0.9rem",
                    }}
                  >
                    {formatValue(high)} °
                  </Typography>
                </Box>

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
                    {t("weather.low")}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 750,
                      fontSize: "0.9rem",
                    }}
                  >
                    {formatValue(low)} °
                  </Typography>
                </Box>

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
            </Box>

            {/* ============================================================ */}
            {/* Monthly Chart Card                                           */}
            {/* ============================================================ */}

            <Box
              sx={(theme: Theme) => ({
                flex: 1.25,
                minWidth: 0,

                minHeight: {
                  xs: 300,
                  sm: 330,
                  md: 390,
                },

                borderRadius: {
                  xs: 4,
                  md: 5,
                },

                px: {
                  xs: 2.5,
                  sm: 3,
                  md: 3.5,
                },

                py: {
                  xs: 2.5,
                  sm: 3,
                  md: 3.5,
                },

                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))"
                    : "linear-gradient(145deg, rgba(247,251,253,0.90), rgba(221,233,240,0.70))",

                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255,255,255,0.10)"
                    : "1px solid rgba(23,50,74,0.09)",

                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",

                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 25px 70px rgba(0,0,0,0.22)"
                    : "0 20px 60px rgba(38,76,101,0.11)",

                display: "flex",
                flexDirection: "column",
              })}
            >
              {/* Chart heading */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1.1rem",
                      },

                      fontWeight: 700,
                    }}
                  >
                    {t("weather.avgMonthly")}
                  </Typography>

                  <Typography
                    sx={(theme: Theme) => ({
                      mt: 0.4,
                      fontSize: "0.76rem",

                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.50)"
                          : "#60798A",
                    })}
                  >
                    {t("weather.avgMonthly")}
                  </Typography>
                </Box>

                <Box
                  sx={(theme: Theme) => ({
                    width: 38,
                    height: 38,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: 2.5,

                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(76,223,232,0.08)"
                        : "rgba(8,120,201,0.08)",

                    border:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(76,223,232,0.12)"
                        : "1px solid rgba(8,120,201,0.13)",
                  })}
                >
                  <TrendingUpRoundedIcon
                    sx={{
                      fontSize: 20,
                      color: isDarkMode ? "#4CDFE8" : "#0878C9",
                    }}
                  />
                </Box>
              </Box>

              {/* Chart */}
              <Box
                sx={{
                  flex: 1,

                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "center",

                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    overflow: "hidden",

                    color: isDarkMode ? "#ffffff" : "#35566D",
                  }}
                >
                  <svg
                    width="100%"
                    height={chartHeight}
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    preserveAspectRatio="none"
                  >
                    <defs>{gradient}</defs>

                    {[0.2, 0.4, 0.6, 0.8].map((position) => (
                      <line
                        key={position}
                        x1={0}
                        x2={chartWidth}
                        y1={position * chartHeight}
                        y2={position * chartHeight}
                        stroke="currentColor"
                        strokeDasharray="3 8"
                        opacity={isDarkMode ? 0.12 : 0.18}
                      />
                    ))}

                    {points && (
                      <>
                        <polyline
                          points={points}
                          fill="none"
                          stroke={isDarkMode ? "#4CDFE8" : "#0878C9"}
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={0.95}
                        />

                        <polyline
                          points={points}
                          fill="url(#monthlyWeatherGradient)"
                          stroke="none"
                          opacity={0.7}
                        />
                      </>
                    )}
                  </svg>
                </Box>

                {/* Month labels */}
                <Box
                  sx={(theme: Theme) => ({
                    display: "flex",
                    justifyContent: "space-between",

                    mt: 1,

                    overflow: "hidden",

                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.65)"
                        : "#557084",
                  })}
                >
                  {months.map((month, index) => (
                    <Typography
                      key={`${month.label}-${index}`}
                      variant="caption"
                      sx={{
                        fontSize: "0.62rem",

                        opacity: 0.85,

                        whiteSpace: "nowrap",
                      }}
                    >
                      {month.label || ""}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      )}
    </Box>
  );
};

export default WeatherHero;
