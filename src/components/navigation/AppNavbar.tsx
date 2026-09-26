import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ButtonGroup,
  Button,
  TextField,
  IconButton,
  type Theme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import ModeToggle from "../Modetoggle";

import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

type AppNavbarProps = {
  setCity: (city: string) => void;
};

const AppNavbar: React.FC<AppNavbarProps> = ({ setCity }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [input, setInput] = useState<string>("");

  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleExit = (): void => {
    navigate("/");
  };

  const handleSearch = (): void => {
    const cityName = input.trim();

    if (!cityName) {
      return;
    }

    setCity(cityName);
    setInput("");
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter") {
      handleSearch();
    }
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

          /*
           * Same glass surface as AppFooter
           */
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

          /*
           * Subtle ambient glow
           */
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
          {/* ================================================================ */}
          {/* Brand                                                            */}
          {/* ================================================================ */}

          <Box
            className="rtl-row"
            sx={{
              display: "flex",
              alignItems: "center",

              gap: {
                xs: 0.75,
                sm: 1,
              },

              flexShrink: 0,
            }}
          >
            <Box
              sx={(theme) => ({
                width: {
                  xs: 44,
                  sm: 50,
                  md: 54,
                },

                height: {
                  xs: 44,
                  sm: 50,
                  md: 54,
                },

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "50%",

                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.055)"
                    : "rgba(255,255,255,0.55)",

                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,52,100,0.06)",

                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 0 25px rgba(50,180,255,0.07)"
                    : "0 5px 20px rgba(30,80,110,0.07)",

                overflow: "hidden",
              })}
            >
              <Box
                component="img"
                src="/nav.png"
                alt="Weather App"
                sx={{
                  width: {
                    xs: 38,
                    sm: 44,
                    md: 48,
                  },

                  height: {
                    xs: 38,
                    sm: 44,
                    md: 48,
                  },

                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Typography
              variant="body1"
              noWrap
              sx={(theme) => ({
                fontSize: {
                  xs: "0.78rem",
                  sm: "0.9rem",
                  md: "1rem",
                },

                fontWeight: 600,

                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.9)"
                    : "#003464",
              })}
            >
              {t("app.title")}
            </Typography>
          </Box>

          {/* ================================================================ */}
          {/* Search + Settings                                                */}
          {/* ================================================================ */}

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
            <TextField
              label={t("header.search")}
              variant="outlined"
              size="small"
              value={input}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInput(event.target.value);
              }}
              onKeyDown={handleSearchKeyDown}
              fullWidth
              sx={(theme) => ({
                maxWidth: {
                  sm: 230,
                  md: 280,
                  lg: 310,
                },

                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,

                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.035)"
                      : "rgba(255,255,255,0.52)",

                  backdropFilter: "blur(12px)",

                  WebkitBackdropFilter: "blur(12px)",

                  "& fieldset": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.09)"
                        : "rgba(0,52,100,0.09)",
                  },

                  "&:hover fieldset": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.16)"
                        : "rgba(0,52,100,0.15)",
                  },

                  "&.Mui-focused": {
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 0 20px rgba(76,223,232,0.07)"
                        : "0 0 20px rgba(0,127,255,0.05)",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(76,223,232,0.45)"
                        : "rgba(0,127,255,0.35)",
                  },
                },

                "& .MuiInputLabel-root": {
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.48)"
                      : "rgba(0,52,100,0.5)",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.mode === "dark" ? "#4CDFE8" : "#007FFF",
                },

                "& input": {
                  textAlign: i18n.language === "fa" ? "right" : "left",
                },
              })}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleSearch}
                    size="small"
                    aria-label={t("header.search")}
                    sx={(theme) => ({
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.48)"
                          : "rgba(0,52,100,0.48)",

                      "&:hover": {
                        color:
                          theme.palette.mode === "dark" ? "#4CDFE8" : "#007FFF",

                        background:
                          theme.palette.mode === "dark"
                            ? "rgba(76,223,232,0.07)"
                            : "rgba(0,127,255,0.06)",
                      },
                    })}
                  >
                    <SearchRoundedIcon
                      sx={{
                        fontSize: 19,
                      }}
                    />
                  </IconButton>
                ),
              }}
            />

            <IconButton
              id="settings-button"
              aria-controls={menuOpen ? "nav-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? "true" : undefined}
              onClick={handleMenuOpen}
              color="inherit"
              size="medium"
              sx={(theme) => ({
                width: 42,
                height: 42,

                flexShrink: 0,

                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255,255,255,0.09)"
                    : "1px solid rgba(0,52,100,0.08)",

                borderRadius: 3,

                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.035)"
                    : "rgba(255,255,255,0.48)",

                transition: "all 0.2s ease",

                "&:hover": {
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(76,223,232,0.07)"
                      : "rgba(0,127,255,0.06)",

                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(76,223,232,0.2)"
                      : "rgba(0,127,255,0.18)",

                  transform: "translateY(-1px)",
                },
              })}
            >
              <SettingsIcon
                sx={{
                  fontSize: 21,
                }}
              />
            </IconButton>
          </Box>

          {/* ================================================================ */}
          {/* Settings Menu                                                    */}
          {/* ================================================================ */}

          <Menu
            id="nav-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: i18n.language === "fa" ? "left" : "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: i18n.language === "fa" ? "left" : "right",
            }}
            PaperProps={{
              sx: (theme: Theme) => ({
                mt: 1,

                minWidth: 235,

                direction: i18n.language === "fa" ? "rtl" : "ltr",

                textAlign: "start",

                borderRadius: 3,

                overflow: "hidden",

                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))"
                    : "linear-gradient(145deg, rgba(255,255,255,0.88), rgba(255,255,255,0.68))",

                color: theme.palette.text.primary,

                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255,255,255,0.09)"
                    : "1px solid rgba(0,52,100,0.07)",

                backdropFilter: "blur(24px)",

                WebkitBackdropFilter: "blur(24px)",

                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 20px 60px rgba(0,0,0,0.28)"
                    : "0 15px 45px rgba(30,80,110,0.10)",

                "& .MuiMenuItem-root": {
                  textAlign: "start",

                  transition: "background 0.2s ease",

                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(76,223,232,0.055)"
                        : "rgba(0,127,255,0.045)",
                  },
                },
              }),
            }}
          >
            {/* Theme */}
            <MenuItem
              onClick={handleMenuClose}
              sx={(theme) => ({
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",

                borderBottom: `1px solid ${theme.palette.divider}`,

                gap: 1,

                textAlign: "start",

                py: 1.5,
              })}
            >
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  opacity: 0.7,
                }}
              >
                {t("header.mode")}
              </Typography>

              <Box sx={{ width: 170 }}>
                <ModeToggle />
              </Box>
            </MenuItem>

            {/* Language */}
            <MenuItem
              onClick={handleMenuClose}
              sx={(theme) => ({
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",

                borderBottom: `1px solid ${theme.palette.divider}`,

                gap: 1,

                py: 1.5,
              })}
            >
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  opacity: 0.7,
                }}
              >
                {t("header.language")}
              </Typography>

              <Box sx={{ width: 170 }}>
                <ButtonGroup
                  size="small"
                  variant="outlined"
                  fullWidth
                  sx={{
                    flexDirection:
                      i18n.language === "fa" ? "row-reverse" : "row",
                  }}
                >
                  <Button onClick={() => i18n.changeLanguage("en")}>
                    {t("header.english")}
                  </Button>

                  <Button onClick={() => i18n.changeLanguage("fa")}>
                    {t("header.persian")}
                  </Button>
                </ButtonGroup>
              </Box>
            </MenuItem>

            {/* Exit */}
            <MenuItem
              onClick={handleExit}
              sx={(theme) => ({
                display: "flex",
                gap: 1,

                flexDirection: i18n.language === "fa" ? "row-reverse" : "row",

                alignItems: "center",

                textAlign: "start",

                py: 1.5,

                "&:hover": {
                  color: theme.palette.mode === "dark" ? "#ff8a80" : "#d32f2f",

                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,100,100,0.05)"
                      : "rgba(211,47,47,0.04)",
                },
              })}
            >
              <LogoutIcon
                sx={{
                  fontSize: 20,
                }}
              />

              {t("header.exit")}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* AppBar spacer */}
      <Toolbar />
    </Box>
  );
};

export default AppNavbar;
