import React from "react";
import { Box } from "@mui/material";
import {
  createParticles,
  createRaindrops,
  createSnowflakes,
  createStars,
  type Particle,
  type WeatherSceneType,
} from "./weatherEffects";

type WeatherSceneProps = {
  scene: WeatherSceneType;
  lightning: boolean;
};

const WeatherScene: React.FC<WeatherSceneProps> = ({ scene, lightning }) => {
  const snowflakes = React.useMemo(() => createSnowflakes(), []);

  const raindrops = React.useMemo(() => createRaindrops(), []);

  const stars = React.useMemo(() => createStars(), []);

  const particles = React.useMemo(() => createParticles(), []);

  return (
    <>
      {scene === "sunny" && <SunnyScene particles={particles} />}

      {scene === "night" && <NightScene stars={stars} />}

      {scene === "rain" && (
        <RainScene raindrops={raindrops} lightning={lightning} />
      )}

      {scene === "snow" && (
        <SnowScene snowflakes={snowflakes} particles={particles} />
      )}
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Sunny                                                                      */
/* -------------------------------------------------------------------------- */

const SunnyScene: React.FC<{
  particles: Particle[];
}> = ({ particles }) => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: 190,
          height: 190,
          top: "7%",
          right: "11%",
          borderRadius: "50%",

          background: `
      radial-gradient(
        circle at 38% 35%,
        #ffffff 0%,
        #fffde7 18%,
        #ffe082 45%,
        #ffc107 72%,
        #ff9800 100%
      )
    `,

          boxShadow: `
      0 0 25px rgba(255, 245, 180, 0.95),
      0 0 60px rgba(255, 193, 7, 0.55),
      0 0 120px rgba(255, 152, 0, 0.25)
    `,

          animation: "sunPulse 5s ease-in-out infinite",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: -55,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,193,7,0.18), transparent 65%)",
            zIndex: -1,
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          top: "-5%",
          right: "-2%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,193,7,0.13), transparent 68%)",
          animation: "sunGlow 7s ease-in-out infinite alternate",
        }}
      />

      <Cloud top="25%" left="-220px" duration="34s" />

      <Cloud top="63%" left="-330px" duration="45s" scale={0.72} />

      <FloatingParticles particles={particles} />
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Night                                                                      */
/* -------------------------------------------------------------------------- */

const NightScene: React.FC<{
  stars: Particle[];
}> = ({ stars }) => {
  return (
    <>
      {stars.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: "absolute",
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 8px rgba(255,255,255,0.8)",
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "13%",
          width: 115,
          height: 115,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, #ffffff, #edf2ff 55%, #c6d0e8)",
          boxShadow:
            "0 0 35px rgba(220,230,255,0.55), 0 0 110px rgba(130,160,255,0.2)",
          animation: "moonFloat 5s ease-in-out infinite",
        }}
      />

      <MoonCrater top="28%" left="30%" size={12} />
      <MoonCrater top="55%" left="60%" size={8} />
      <MoonCrater top="65%" left="35%" size={6} />

      <Cloud top="42%" left="-250px" duration="40s" scale={0.85} />

      <Box
        sx={{
          position: "absolute",
          top: "18%",
          left: "-120px",
          width: 110,
          height: 2,
          borderRadius: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.95))",
          transform: "rotate(-25deg)",
          animation: "shootingStar 8s linear infinite",
          animationDelay: "3s",
        }}
      />
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Rain                                                                       */
/* -------------------------------------------------------------------------- */

const RainScene: React.FC<{
  raindrops: Particle[];
  lightning: boolean;
}> = ({ raindrops, lightning }) => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 220,
          top: "4%",
          left: "5%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(100,120,145,0.17), transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      <Cloud top="14%" left="-220px" duration="30s" scale={1.15} dark />

      <Cloud top="35%" left="-350px" duration="38s" scale={0.85} dark />

      {raindrops.map((drop) => (
        <Box
          key={drop.id}
          sx={{
            position: "absolute",
            top: "-30px",
            left: `${drop.left}%`,
            width: 1.5,
            height: drop.size,
            borderRadius: 2,
            background:
              "linear-gradient(to bottom, transparent, rgba(130,200,255,0.8))",
            transform: "rotate(12deg)",
            animation: `rainFall ${drop.duration}s linear ${drop.delay}s infinite`,
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(220,235,255,0.75)",
          opacity: lightning ? 1 : 0,
          transition: "opacity 40ms ease",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "16%",
          right: "28%",
          width: 5,
          height: 115,
          opacity: lightning ? 1 : 0,
          transform: "rotate(18deg)",
          background: "linear-gradient(180deg, #fff, #b8d7ff, transparent)",
          clipPath:
            "polygon(55% 0, 100% 0, 62% 42%, 90% 42%, 20% 100%, 38% 52%, 8% 52%)",
          filter: "drop-shadow(0 0 12px #fff)",
        }}
      />
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Snow                                                                       */
/* -------------------------------------------------------------------------- */

const SnowScene: React.FC<{
  snowflakes: Particle[];
  particles: Particle[];
}> = ({ snowflakes, particles }) => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: 450,
          height: 450,
          top: "-200px",
          left: "-100px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,225,255,0.16), transparent 68%)",
        }}
      />

      <Cloud top="13%" left="-250px" duration="35s" scale={1.1} />

      <Cloud top="43%" left="-350px" duration="48s" scale={0.75} />

      {snowflakes.map((snow) => (
        <Box
          key={snow.id}
          sx={{
            position: "absolute",
            top: "-15px",
            left: `${snow.left}%`,
            width: snow.size,
            height: snow.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            boxShadow: "0 0 7px rgba(255,255,255,0.6)",
            animation: `snowFall ${snow.duration}s linear ${snow.delay}s infinite`,
          }}
        />
      ))}

      <FloatingParticles particles={particles} />
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Shared components                                                          */
/* -------------------------------------------------------------------------- */

type CloudProps = {
  top: string;
  left: string;
  duration: string;
  scale?: number;
  dark?: boolean;
};

const Cloud: React.FC<CloudProps> = ({
  top,
  left,
  duration,
  scale = 1,
  dark = false,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top,
        left,
        width: 230,
        height: 62,
        borderRadius: "60px",
        background: dark ? "rgba(80,95,115,0.17)" : "rgba(255,255,255,0.07)",
        boxShadow: dark
          ? `
            45px -25px 0 -4px rgba(80,95,115,0.16),
            100px -35px 0 -7px rgba(80,95,115,0.14),
            155px -18px 0 -3px rgba(80,95,115,0.15)
          `
          : `
            45px -25px 0 -4px rgba(255,255,255,0.065),
            100px -35px 0 -7px rgba(255,255,255,0.055),
            155px -18px 0 -3px rgba(255,255,255,0.06)
          `,
        filter: "blur(1px)",
        transform: `scale(${scale})`,
        transformOrigin: "center",
        animation: `cloudMove ${duration} linear infinite`,
      }}
    />
  );
};

type MoonCraterProps = {
  top: string;
  left: string;
  size: number;
};

const MoonCrater: React.FC<MoonCraterProps> = ({ top, left, size }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(160,170,195,0.22)",
      }}
    />
  );
};

const FloatingParticles: React.FC<{
  particles: Particle[];
}> = ({ particles }) => {
  return (
    <>
      {particles.map((particle) => (
        <Box
          key={particle.id}
          sx={{
            position: "absolute",
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.5)",
            animation: `twinkle ${particle.duration}s ease-in-out ${particle.delay}s infinite alternate`,
          }}
        />
      ))}
    </>
  );
};

export default WeatherScene;
