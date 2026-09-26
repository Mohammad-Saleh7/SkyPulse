import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import WeatherScene from "./WeatherScene";
import {
  getRandomLightningDelay,
  getRandomScene,
  getRandomSceneDuration,
  type WeatherSceneType,
} from "./weatherEffects";

const WeatherAnimation: React.FC = () => {
  const [scene, setScene] = useState<WeatherSceneType>("sunny");

  const [visible, setVisible] = useState(true);

  const [lightning, setLightning] = useState(false);

  /* ---------------------------------------------------------------------- */
  /* Scene rotation                                                         */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const scheduleNextScene = () => {
      timer = setTimeout(() => {
        setVisible(false);

        setTimeout(() => {
          setScene((currentScene) => getRandomScene(currentScene));

          setVisible(true);

          scheduleNextScene();
        }, 1000);
      }, getRandomSceneDuration());
    };

    scheduleNextScene();

    return () => clearTimeout(timer);
  }, []);

  /* ---------------------------------------------------------------------- */
  /* Lightning                                                               */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (scene !== "rain") {
      setLightning(false);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const scheduleLightning = () => {
      timer = setTimeout(() => {
        setLightning(true);

        setTimeout(() => {
          setLightning(false);
        }, 160);

        setTimeout(() => {
          if (Math.random() > 0.45) {
            setLightning(true);

            setTimeout(() => {
              setLightning(false);
            }, 110);
          }
        }, 240);

        scheduleLightning();
      }, getRandomLightningDelay());
    };

    scheduleLightning();

    return () => clearTimeout(timer);
  }, [scene]);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        bgcolor: scene === "sunny" ? "#174a6f" : "#000",
        transition: "background-color 1.5s ease",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          opacity: visible ? 1 : 0,

          transform: visible ? "scale(1)" : "scale(1.035)",

          transition: "opacity 1.2s ease, transform 1.6s ease",
        }}
      >
        <WeatherScene scene={scene} lightning={lightning} />
      </Box>

      {/* Readability overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.5))",
        }}
      />

      <style>
        {`
          @keyframes sunPulse {
            0%, 100% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.08);
            }
          }

          @keyframes sunGlow {
            from {
              transform: scale(0.9);
              opacity: 0.5;
            }

            to {
              transform: scale(1.15);
              opacity: 1;
            }
          }

          @keyframes moonFloat {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-12px);
            }
          }

          @keyframes twinkle {
            from {
              opacity: 0.2;
              transform: scale(0.7);
            }

            to {
              opacity: 1;
              transform: scale(1.25);
            }
          }

          @keyframes cloudMove {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(calc(100vw + 500px));
            }
          }

          @keyframes rainFall {
            from {
              transform: translateY(0) rotate(12deg);
            }

            to {
              transform: translateY(115vh) rotate(12deg);
            }
          }

          @keyframes snowFall {
            0% {
              transform: translate3d(0, -20px, 0);
            }

            50% {
              transform: translate3d(45px, 55vh, 0);
            }

            100% {
              transform: translate3d(-30px, 115vh, 0);
            }
          }

          @keyframes shootingStar {
            0% {
              transform: translate(-100px, -40px) rotate(-25deg);
              opacity: 0;
            }

            8% {
              opacity: 1;
            }

            25% {
              transform: translate(80vw, 30vh) rotate(-25deg);
              opacity: 0;
            }

            100% {
              opacity: 0;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default WeatherAnimation;
