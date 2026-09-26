import React from "react";
import { Box } from "@mui/material";

const AppBackground: React.FC = () => {
  return (
    <>
      <Box
        sx={(theme) => ({
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
        })}
      />

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

      <Box
        sx={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 100%)",
        }}
      />
    </>
  );
};

export default AppBackground;
