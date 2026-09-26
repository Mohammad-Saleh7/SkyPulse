export type WeatherSceneType = "sunny" | "night" | "rain" | "snow";

export const WEATHER_SCENES: WeatherSceneType[] = [
  "sunny",
  "night",
  "rain",
  "snow",
];

export type Particle = {
  id: number;
  left: number;
  top?: number;
  delay: number;
  duration: number;
  size: number;
};

export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const createSnowflakes = (count = 55): Particle[] => {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: randomBetween(0, 100),
    delay: randomBetween(0, 6),
    duration: randomBetween(5, 10),
    size: randomBetween(2, 6),
  }));
};

export const createRaindrops = (count = 65): Particle[] => {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: randomBetween(0, 100),
    delay: randomBetween(0, 2),
    duration: randomBetween(0.6, 1.2),
    size: randomBetween(10, 22),
  }));
};

export const createStars = (count = 45): Particle[] => {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: randomBetween(2, 98),
    top: randomBetween(3, 75),
    delay: randomBetween(0, 4),
    duration: randomBetween(2, 5),
    size: randomBetween(1, 3),
  }));
};

export const createParticles = (count = 12): Particle[] => {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: randomBetween(0, 100),
    top: randomBetween(20, 90),
    delay: randomBetween(0, 4),
    duration: randomBetween(3, 6),
    size: randomBetween(1, 3),
  }));
};

export const getRandomScene = (
  currentScene: WeatherSceneType,
): WeatherSceneType => {
  const availableScenes = WEATHER_SCENES.filter(
    (scene) => scene !== currentScene,
  );

  return availableScenes[Math.floor(Math.random() * availableScenes.length)];
};

export const getRandomSceneDuration = (): number => {
  return randomBetween(6000, 10000);
};

export const getRandomLightningDelay = (): number => {
  return randomBetween(3500, 8000);
};
