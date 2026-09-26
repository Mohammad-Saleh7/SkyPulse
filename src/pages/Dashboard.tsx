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
import AppBackground from "../components/common/AppBackground";

import useDashboardWeather from "../hooks/useDashboardWeather";
import useCityClock from "../hooks/useCityClock";

type ToastState = {
  open: boolean;
  message: string;
};

const DashboardPage: React.FC = () => {
  const { i18n } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const { weather, forecast, monthlyData, loading, error, setCity } =
    useDashboardWeather();

  const clock = useCityClock(weather?.tzOffsetSec, i18n.language);

  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
  });

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

  useEffect(() => {
    if (!error) {
      return;
    }

    showToast(error);
  }, [error]);

  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",

        bgcolor: theme.palette.mode === "dark" ? "#000000" : "#eef5f9",

        color: theme.palette.mode === "dark" ? "#ffffff" : "#003464",

        transition: "background-color 0.3s ease, color 0.3s ease",
      })}
    >
      <AppBackground />

      <AppToast
        open={toast.open}
        message={toast.message}
        onClose={closeToast}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
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

        {loading && <AppLoading fullscreen={false} overlay />}
      </Box>
    </Box>
  );
};

export default DashboardPage;
