import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import WeatherHero from "../components/weather/WeatherHero";
import WeatherForecast from "../components/weather/WeatherForecast";
import AppNavbar from "../components/navigation/AppNavbar";
import AppFooter from "../components/layout/Footer";
import AppToast from "../components/common/Toast";
import AppLoading from "../components/common/AppLoading";

import {
  getWeatherByCity,
  getTwoWeeksForecast,
  getMonthlyWeather,
} from "../utils/api";

type Coord = {
  lat: number;
  lon: number;
};

type Weather = {
  cityName: string;
  tzOffsetSec: number;
  coord?: Coord;
  Temperature: number | string;
  high: number | string;
  low: number | string;
  Status?: string;
  img: string;
  feelsLike?: number | string;
};

type ForecastItem = {
  date?: string;
  weekday: string;
  icon: React.ReactNode;
  maxTemp: number;
};

type MonthlyPoint = {
  month?: string;
  label?: string;
  avgTemp?: number;
};

type ToastState = {
  open: boolean;
  message: string;
};

const DashboardPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const [weather, setWeather] = useState<Weather | null>(null);

  const [forecast, setForecast] = useState<ForecastItem[]>([]);

  const [monthlyData, setMonthlyData] = useState<MonthlyPoint[]>([]);

  const [city, setCity] = useState<string>("Tehran");

  const [loading, setLoading] = useState<boolean>(true);

  const [clock, setClock] = useState<{
    day: string;
    date: string;
    hour: string;
  }>({
    day: "",
    date: "",
    hour: "",
  });

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
  });

  /* -------------------------------------------------------------------------- */
  /* Toast                                                                      */
  /* -------------------------------------------------------------------------- */

  const showToast = (message: string): void => {
    setToast({
      open: true,
      message,
    });
  };

  const closeToast = (): void => {
    setToast((previousToast) => ({
      ...previousToast,
      open: false,
    }));
  };

  /* -------------------------------------------------------------------------- */
  /* Login welcome toast                                                        */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const message = location.state?.toast?.message;

    if (!message) {
      return;
    }

    showToast(message);

    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [location, navigate]);

  /* -------------------------------------------------------------------------- */
  /* City clock                                                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (weather?.tzOffsetSec == null) {
      return;
    }

    const locale = i18n.language === "fa" ? "fa-IR" : "en-US";

    const updateClock = (): void => {
      const utcNowMs = Date.now();

      const cityNow = new Date(utcNowMs + weather.tzOffsetSec * 1000);

      setClock({
        day: cityNow.toLocaleDateString(locale, {
          weekday: "long",
          timeZone: "UTC",
        }),

        date: cityNow.toLocaleDateString(locale, {
          month: "short",
          day: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        }),

        hour: cityNow.toLocaleTimeString(locale, {
          hour: "numeric",
          minute: "2-digit",
          timeZone: "UTC",
        }),
      });
    };

    updateClock();

    const intervalId = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [weather?.tzOffsetSec, i18n.language]);

  /* -------------------------------------------------------------------------- */
  /* Fetch weather data                                                         */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async (): Promise<void> => {
      try {
        setLoading(true);

        const weatherData = (await getWeatherByCity(city)) as Weather;

        if (cancelled) {
          return;
        }

        setWeather(weatherData);

        const lat = weatherData?.coord?.lat;
        const lon = weatherData?.coord?.lon;

        if (lat == null || lon == null) {
          setForecast([]);
          setMonthlyData([]);
          return;
        }

        const [forecastData, monthlyWeather] = await Promise.all([
          getTwoWeeksForecast(lat, lon) as Promise<ForecastItem[]>,

          getMonthlyWeather(lat, lon) as Promise<MonthlyPoint[]>,
        ]);

        if (cancelled) {
          return;
        }

        setForecast(forecastData);
        setMonthlyData(monthlyWeather);
      } catch (error: unknown) {
        if (cancelled) {
          return;
        }

        console.error(error);

        const errorMessage =
          typeof error === "object" && error !== null && "message" in error
            ? String(error.message)
            : t("errors.cityNotFound");

        setWeather(null);
        setForecast([]);
        setMonthlyData([]);

        showToast(errorMessage);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, [city, t]);

  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",

        bgcolor: theme.palette.mode === "dark" ? "#000000" : "#eef5f9",

        color: theme.palette.mode === "dark" ? "#ffffff" : "#003464",

        transition: "background-color 0.3s ease, color 0.3s ease",

        "&::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,

          background:
            theme.palette.mode === "dark"
              ? `
                radial-gradient(
                  circle at 15% 10%,
                  rgba(50, 145, 255, 0.14),
                  transparent 32%
                ),
                radial-gradient(
                  circle at 85% 20%,
                  rgba(122, 75, 255, 0.12),
                  transparent 30%
                ),
                radial-gradient(
                  circle at 50% 100%,
                  rgba(30, 180, 210, 0.07),
                  transparent 35%
                )
              `
              : `
                radial-gradient(
                  circle at 10% 5%,
                  rgba(77, 180, 230, 0.18),
                  transparent 28%
                ),
                radial-gradient(
                  circle at 90% 15%,
                  rgba(120, 90, 230, 0.10),
                  transparent 28%
                ),
                radial-gradient(
                  circle at 50% 100%,
                  rgba(70, 160, 210, 0.08),
                  transparent 35%
                )
              `,
        },

        "&::after": {
          content: '""',
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,

          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 100%)",
        },
      })}
    >
      {/* -------------------------------------------------------------------- */}
      {/* Ambient background glow                                              */}
      {/* -------------------------------------------------------------------- */}

      <Box
        sx={{
          position: "fixed",
          width: {
            xs: 220,
            sm: 320,
          },
          height: {
            xs: 220,
            sm: 320,
          },
          borderRadius: "50%",
          top: {
            xs: 100,
            sm: 120,
          },
          right: {
            xs: -100,
            sm: -80,
          },
          background: "rgba(50, 145, 255, 0.10)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "fixed",
          width: {
            xs: 180,
            sm: 280,
          },
          height: {
            xs: 180,
            sm: 280,
          },
          borderRadius: "50%",
          bottom: {
            xs: 100,
            sm: 60,
          },
          left: {
            xs: -90,
            sm: -60,
          },
          background: "rgba(120, 75, 255, 0.08)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* -------------------------------------------------------------------- */}
      {/* Toast                                                                  */}
      {/* -------------------------------------------------------------------- */}

      <AppToast
        open={toast.open}
        message={toast.message}
        onClose={closeToast}
      />

      {/* -------------------------------------------------------------------- */}
      {/* Main content                                                           */}
      {/* -------------------------------------------------------------------- */}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Navbar همیشه روی صفحه باقی می‌ماند */}
        <AppNavbar setCity={setCity} />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,

            pt: {
              xs: 1,
              sm: 2,
            },

            pb: {
              xs: 3,
              sm: 5,
            },
          }}
        >
          {weather && (
            <WeatherHero
              cityName={weather.cityName}
              day={clock.day}
              date={clock.date}
              hour={clock.hour}
              Temperature={weather.Temperature}
              high={weather.high}
              low={weather.low}
              Status={weather.Status}
              img={weather.img}
              feels={weather.feelsLike}
              monthlyData={monthlyData}
            />
          )}

          <WeatherForecast forecast={forecast} />
        </Container>

        <AppFooter />

        {/* ------------------------------------------------------------------ */}
        {/* Single global loading overlay                                      */}
        {/* ------------------------------------------------------------------ */}

        {loading && <AppLoading fullscreen={false} overlay />}
      </Box>
    </Box>
  );
};

export default DashboardPage;
