import React from "react";
import { Box, Stack, Typography, type Theme } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useTranslation } from "react-i18next";

type ForecastItem = {
  date?: string;
  weekday: string;
  icon?: React.ReactNode;
  maxTemp: number;
};

type WeatherForecastProps = {
  forecast?: ForecastItem[];
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast = [] }) => {
  const { t, i18n } = useTranslation();

  const locale = i18n.language === "fa" ? "fa-IR" : "en-US";

  const numberFormatter = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  });

  return (
    <Box>
      <Stack
        justifyContent="center"
        alignItems="stretch"
        sx={{
          mt: {
            xs: 2,
            sm: 3,
            md: 2.5,
          },
        }}
      >
        <Box
          component="section"
          aria-labelledby="forecast-heading"
          sx={(theme: Theme) => ({
            position: "relative",
            overflow: "hidden",

            width: "100%",

            borderRadius: {
              xs: 4,
              md: 5,
            },

            px: {
              xs: 2,
              sm: 3,
              md: 3.5,
            },

            py: {
              xs: 2.5,
              sm: 3,
            },

            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))"
                : "linear-gradient(145deg, rgba(255,255,255,0.82), rgba(255,255,255,0.58))",

            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.10)"
                : "1px solid rgba(0,52,100,0.07)",

            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",

            boxShadow:
              theme.palette.mode === "dark"
                ? "0 25px 70px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "0 20px 60px rgba(25,80,110,0.08)",

            "&::before": {
              content: '""',
              position: "absolute",

              width: 260,
              height: 260,

              top: -180,
              right: -80,

              borderRadius: "50%",

              background:
                theme.palette.mode === "dark"
                  ? "rgba(60,190,255,0.08)"
                  : "rgba(60,170,230,0.07)",

              filter: "blur(45px)",
              pointerEvents: "none",
            },
          })}
        >
          {/* Section Header */}
          <Box
            sx={{
              position: "relative",
              zIndex: 1,

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: 2.5,

                  background: "rgba(76,223,232,0.08)",
                  border: "1px solid rgba(76,223,232,0.12)",

                  flexShrink: 0,
                }}
              >
                <CalendarMonthRoundedIcon
                  sx={{
                    fontSize: 20,
                    color: "#4CDFE8",
                  }}
                />
              </Box>

              <Box>
                <Typography
                  id="forecast-heading"
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 700,

                    fontSize: {
                      xs: "1rem",
                      sm: "1.1rem",
                    },
                  }}
                >
                  {t("forecast.title2w")}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.72rem",
                    opacity: 0.45,
                    mt: 0.25,
                  }}
                >
                  {forecast.length} {i18n.language === "fa" ? "روز" : "days"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Forecast List */}
          <Box
            role="list"
            sx={(theme: Theme) => ({
              position: "relative",
              zIndex: 1,

              mt: 2.5,

              display: "flex",
              gap: 1.5,

              overflowX: "auto",

              pb: 1,

              direction: i18n.language === "fa" ? "rtl" : "ltr",

              scrollSnapType: {
                xs: "x mandatory",
                md: "none",
              },

              "& > *": {
                scrollSnapAlign: {
                  xs: "start",
                  md: "none",
                },
              },

              "&::-webkit-scrollbar": {
                height: 5,
              },

              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },

              "&::-webkit-scrollbar-thumb": {
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.14)"
                    : "rgba(0,52,100,0.12)",

                borderRadius: 10,
              },
            })}
          >
            {forecast.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  minHeight: 180,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  opacity: 0.6,
                }}
              >
                <Typography>{t("forecast.empty")}</Typography>
              </Box>
            ) : (
              forecast.map((item, index) => {
                const key =
                  item.date && !Number.isNaN(Date.parse(item.date))
                    ? item.date
                    : `${index}-${item.weekday}`;

                const dayLabel =
                  index === 0 ? t("forecast.today") : item.weekday;

                return (
                  <Box
                    role="listitem"
                    key={key}
                    aria-label={dayLabel}
                    sx={(theme) => ({
                      position: "relative",

                      flexShrink: 0,

                      minWidth: {
                        xs: 88,
                        sm: 96,
                        md: 104,
                      },

                      height: {
                        xs: 190,
                        sm: 205,
                        md: 215,
                      },

                      borderRadius: 3,

                      px: {
                        xs: 1.5,
                        sm: 1.75,
                      },

                      py: 1.75,

                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",

                      overflow: "hidden",

                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(160deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035))"
                          : "rgba(255,255,255,0.48)",

                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.08)"
                          : "1px solid rgba(0,52,100,0.06)",

                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",

                      boxShadow: "0 8px 25px rgba(0,0,0,0.06)",

                      transition:
                        "transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",

                      "&::before": {
                        content: '""',
                        position: "absolute",

                        width: 80,
                        height: 80,

                        top: -50,
                        right: -35,

                        borderRadius: "50%",

                        background: "rgba(76,223,232,0.06)",

                        filter: "blur(18px)",

                        pointerEvents: "none",
                      },

                      "&:hover": {
                        transform: "translateY(-5px)",

                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(160deg, rgba(255,255,255,0.105), rgba(255,255,255,0.045))"
                            : "rgba(255,255,255,0.72)",

                        borderColor:
                          theme.palette.mode === "dark"
                            ? "rgba(76,223,232,0.18)"
                            : "rgba(0,130,200,0.14)",

                        boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                      },
                    })}
                  >
                    {/* Day */}
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 1,

                        width: "100%",

                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,

                          fontSize: {
                            xs: "0.72rem",
                            sm: "0.78rem",
                          },

                          opacity: 0.78,

                          whiteSpace: "nowrap",
                        }}
                      >
                        {dayLabel}
                      </Typography>
                    </Box>

                    {/* Weather Icon */}
                    <Box
                      aria-hidden
                      sx={{
                        position: "relative",
                        zIndex: 1,

                        width: {
                          xs: 58,
                          sm: 64,
                        },

                        height: {
                          xs: 58,
                          sm: 64,
                        },

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        borderRadius: "50%",

                        background: "rgba(255,255,255,0.055)",

                        border: "1px solid rgba(255,255,255,0.06)",

                        fontSize: {
                          xs: 31,
                          sm: 35,
                        },

                        lineHeight: 1,

                        transition: "transform 0.25s ease",

                        ".MuiBox-root:hover &": {
                          transform: "scale(1.06)",
                        },
                      }}
                      title={dayLabel}
                    >
                      {item.icon ?? "❔"}
                    </Box>

                    {/* Temperature */}
                    {/* Temperature */}
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: {
                            xs: "1rem",
                            sm: "1.1rem",
                          },
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {numberFormatter.format(item.maxTemp)}°C
                      </Typography>
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default WeatherForecast;
