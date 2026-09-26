import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import WeatherHeader from "../components/weather/WeatherHeader";
import WeatherMain from "../components/weather/WeatherMain";
import NavComponent from "../components/navigation/NavComponent";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";

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

const Dashboard: React.FC = () => {
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

  const showToast = (message: string) => {
    setToast({
      open: true,
      message,
    });
  };

  const closeToast = () => {
    setToast((prev) => ({
      ...prev,
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

    const updateClock = () => {
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

  const fetchAll = async (cityName: string) => {
    try {
      setLoading(true);

      const weatherData: Weather = await getWeatherByCity(cityName);

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

      setForecast(forecastData);
      setMonthlyData(monthlyWeather);
    } catch (error: unknown) {
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
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Initial / city change                                                      */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    fetchAll(city);
  }, [city]);

  return (
    <>
      {/* -------------------------------------------------------------------- */}
      {/* Toast                                                                */}
      {/* -------------------------------------------------------------------- */}

      <Toast open={toast.open} message={toast.message} onClose={closeToast} />

      {/* -------------------------------------------------------------------- */}
      {/* Loading                                                              */}
      {/* -------------------------------------------------------------------- */}

      {loading ? (
        <Typography
          variant="h3"
          component="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            minHeight: "100vh",

            gap: 2,

            px: {
              xs: 2,
              sm: 3,
            },

            fontSize: {
              xs: "1.6rem",
              sm: "2rem",
              md: "2.5rem",
            },
          }}
        >
          {t("loading")}

          <CircularProgress size={28} />
        </Typography>
      ) : (
        <>
          {/* ---------------------------------------------------------------- */}
          {/* Navigation                                                       */}
          {/* ---------------------------------------------------------------- */}

          <NavComponent setCity={setCity} />

          {/* ---------------------------------------------------------------- */}
          {/* Weather Header                                                   */}
          {/* ---------------------------------------------------------------- */}

          {weather && (
            <WeatherHeader
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

          {/* ---------------------------------------------------------------- */}
          {/* Weather Main                                                     */}
          {/* ---------------------------------------------------------------- */}

          <WeatherMain forecast={forecast} />

          {/* ---------------------------------------------------------------- */}
          {/* Footer                                                           */}
          {/* ---------------------------------------------------------------- */}

          <Footer />
        </>
      )}
    </>
  );
};

export default Dashboard;
