import React, { useState } from "react";
import { AppBar, Box, Toolbar, type Theme } from "@mui/material";

import NavbarBrand from "./NavbarBrand";
import NavbarSearch from "./NavbarSearch";
import NavbarSettings from "./NavbarSettings";
import NavbarMenu from "./NavbarMenu";

type AppNavbarProps = {
  setCity: (city: string) => void;
};

const AppNavbar: React.FC<AppNavbarProps> = ({ setCity }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        mb: {
          xs: 9,
          sm: 5,
        },
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={(theme: Theme) => ({
          py: {
            xs: 0.5,
            sm: 0.75,
          },

          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))"
              : "linear-gradient(145deg, rgba(255,255,255,0.72), rgba(255,255,255,0.48))",

          color:
            theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary,

          borderBottom:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,52,100,0.06)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          boxShadow:
            theme.palette.mode === "dark"
              ? "0 12px 45px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.025)"
              : "0 12px 40px rgba(30,80,110,0.06)",

          transition: "background 0.3s ease, box-shadow 0.3s ease",

          "&::before": {
            content: '""',
            position: "absolute",

            width: 240,
            height: 120,

            left: "10%",
            top: -100,

            borderRadius: "50%",

            background:
              theme.palette.mode === "dark"
                ? "rgba(70,190,255,0.07)"
                : "rgba(60,170,230,0.06)",

            filter: "blur(45px)",
            pointerEvents: "none",
          },

          "&::after": {
            content: '""',
            position: "absolute",

            width: 180,
            height: 100,

            right: "8%",
            bottom: -90,

            borderRadius: "50%",

            background:
              theme.palette.mode === "dark"
                ? "rgba(76,223,232,0.045)"
                : "rgba(76,180,220,0.04)",

            filter: "blur(40px)",
            pointerEvents: "none",
          },
        })}
      >
        <Toolbar
          sx={{
            position: "relative",
            zIndex: 1,

            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",

            gap: {
              xs: 1,
              sm: 1.5,
              md: 2,
            },

            minHeight: {
              xs: 58,
              sm: 68,
            },
          }}
        >
          <NavbarBrand />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",

              gap: {
                xs: 0.75,
                sm: 1,
              },

              marginInlineStart: {
                xs: 0,
                sm: "auto",
              },

              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            <NavbarSearch setCity={setCity} />

            <NavbarSettings menuOpen={menuOpen} onClick={handleMenuOpen} />
          </Box>

          <NavbarMenu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
          />
        </Toolbar>
      </AppBar>

      {/* AppBar spacer */}
      <Toolbar />
    </Box>
  );
};

export default AppNavbar;
