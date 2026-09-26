import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getWeatherByCity,
  getTwoWeeksForecast,
  getMonthlyWeather,
} from "../utils/api";

import type { Weather, ForecastItem, MonthlyPoint } from "../utils/api";

type UseDashboardWeatherResult = {
  city: string;
  setCity: (city: string) => void;
  weather: Weather | null;
  forecast: ForecastItem[];
  monthlyData: MonthlyPoint[];
  loading: boolean;
  error: string | null;
};

const useDashboardWeather = (): UseDashboardWeatherResult => {
  const { t } = useTranslation();

  const [city, setCity] = useState<string>("Tehran");

  const [weather, setWeather] = useState<Weather | null>(null);

  const [forecast, setForecast] = useState<ForecastItem[]>([]);

  const [monthlyData, setMonthlyData] = useState<MonthlyPoint[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchWeatherData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const weatherData = await getWeatherByCity(city);

        if (cancelled) {
          return;
        }

        setWeather(weatherData);

        const lat = weatherData.coord?.lat;
        const lon = weatherData.coord?.lon;

        if (lat == null || lon == null) {
          setForecast([]);
          setMonthlyData([]);
          return;
        }

        const [forecastData, monthlyWeather] = await Promise.all([
          getTwoWeeksForecast(lat, lon),
          getMonthlyWeather(lat, lon),
        ]);

        if (cancelled) {
          return;
        }

        setForecast(forecastData);
        setMonthlyData(monthlyWeather);
      } catch (requestError: unknown) {
        if (cancelled) {
          return;
        }

        console.error(requestError);

        const errorMessage =
          requestError instanceof Error
            ? requestError.message
            : t("errors.cityNotFound");

        setWeather(null);
        setForecast([]);
        setMonthlyData([]);
        setError(errorMessage);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchWeatherData();

    return () => {
      cancelled = true;
    };
  }, [city, t]);

  return {
    city,
    setCity,
    weather,
    forecast,
    monthlyData,
    loading,
    error,
  };
};

export default useDashboardWeather;
