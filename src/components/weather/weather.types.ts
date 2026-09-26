export type MonthlyPoint = {
  month?: string;
  label?: string;
  avgTemp?: number;
};

export type WeatherHeroProps = {
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

export type WeatherTemperatureProps = {
  temperature: number | string;
  status?: string;
  formatValue: (value: number | string | undefined) => string;
};

export type WeatherStatsProps = {
  high: number | string;
  low: number | string;
  feels?: number | string;
  formatValue: (value: number | string | undefined) => string;
};
