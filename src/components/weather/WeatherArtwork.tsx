import React from "react";
import { Box } from "@mui/material";

type WeatherArtworkProps = {
  status?: string;
  src?: string;
  icon?: React.ReactNode;
  size?: number;
};

const WeatherArtwork: React.FC<WeatherArtworkProps> = ({
  status,
  src,
  icon,
  size = 100,
}) => {
  const normalizedStatus = (status ?? "").toLowerCase();

  const isRain =
    normalizedStatus.includes("rain") ||
    normalizedStatus.includes("drizzle") ||
    normalizedStatus.includes("shower") ||
    normalizedStatus.includes("باران");

  const isStorm =
    normalizedStatus.includes("thunder") ||
    normalizedStatus.includes("storm") ||
    normalizedStatus.includes("رعد");

  const isSnow =
    normalizedStatus.includes("snow") || normalizedStatus.includes("برف");

  const isCloudy =
    normalizedStatus.includes("cloud") ||
    normalizedStatus.includes("overcast") ||
    normalizedStatus.includes("ابری");

  const isFog =
    normalizedStatus.includes("fog") ||
    normalizedStatus.includes("mist") ||
    normalizedStatus.includes("haze") ||
    normalizedStatus.includes("مه");

  const isClear =
    normalizedStatus.includes("clear") ||
    normalizedStatus.includes("sun") ||
    normalizedStatus.includes("صاف");

  let emoji = "🌤️";

  if (isStorm) {
    emoji = "⛈️";
  } else if (isRain) {
    emoji = "🌧️";
  } else if (isSnow) {
    emoji = "❄️";
  } else if (isFog) {
    emoji = "🌫️";
  } else if (isCloudy) {
    emoji = "☁️";
  } else if (isClear) {
    emoji = "☀️";
  }

  return (
    <Box
      sx={{
        position: "relative",

        width: size,
        height: size,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        flexShrink: 0,

        overflow: "visible",

        animation: "weatherFloat 4s ease-in-out infinite",

        "@keyframes weatherFloat": {
          "0%, 100%": {
            transform: "translateY(0)",
          },

          "50%": {
            transform: "translateY(-5px)",
          },
        },
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",

          width: size * 0.65,
          height: size * 0.65,

          borderRadius: "50%",

          background:
            isStorm || isRain
              ? "rgba(76,223,232,0.14)"
              : isSnow
                ? "rgba(180,220,255,0.18)"
                : isCloudy
                  ? "rgba(150,190,220,0.14)"
                  : isFog
                    ? "rgba(180,190,200,0.12)"
                    : "rgba(255,190,70,0.20)",

          filter: "blur(20px)",

          animation: "weatherGlow 3s ease-in-out infinite",

          "@keyframes weatherGlow": {
            "0%, 100%": {
              opacity: 0.55,
              transform: "scale(0.9)",
            },

            "50%": {
              opacity: 1,
              transform: "scale(1.08)",
            },
          },
        }}
      />

      {/* API image */}
      {src ? (
        <Box
          component="img"
          src={src}
          alt={status || "weather"}
          sx={{
            position: "relative",

            width: "82%",
            height: "82%",

            objectFit: "contain",

            zIndex: 2,

            filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.14))",

            transition: "transform 0.3s ease",

            "&:hover": {
              transform: "scale(1.08)",
            },
          }}
        />
      ) : (
        <Box
          component="span"
          sx={{
            position: "relative",

            zIndex: 2,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            width: "100%",
            height: "100%",

            fontSize: size * 0.48,

            lineHeight: 1,

            filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.16))",

            transition: "transform 0.3s ease",

            "&:hover": {
              transform: "scale(1.08)",
            },
          }}
        >
          {icon ?? emoji}
        </Box>
      )}
    </Box>
  );
};

export default WeatherArtwork;
