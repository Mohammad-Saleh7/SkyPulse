import React from "react";
import { Stack, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";

import WeatherCurrent from "./WeatherCurrent";
import MonthlyWeatherChart from "./MonthlyWeatherChart";

import type { WeatherHeroProps } from "./weather.types";

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
  const { i18n } = useTranslation();

  const numberFormatter = new Intl.NumberFormat(
    i18n.language === "fa" ? "fa-IR" : "en-US",
  );

  const formatValue = (value: number | string | undefined): string => {
    return typeof value === "number"
      ? numberFormatter.format(value)
      : (value ?? "");
  };

  return (
    <Stack
      sx={(theme: Theme) => ({
        width: "100%",
        minWidth: 0,

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
      <WeatherCurrent
        cityName={cityName}
        day={day}
        date={date}
        hour={hour}
        Temperature={Temperature}
        high={high}
        low={low}
        img={img}
        Status={Status}
        feels={feels}
        formatValue={formatValue}
      />

      <MonthlyWeatherChart monthlyData={monthlyData} />
    </Stack>
  );
};

export default WeatherHero;
