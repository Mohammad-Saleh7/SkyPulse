import React from "react";
import { Box, Menu, MenuItem, Typography, type Theme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ModeToggle from "../Modetoggle";
import NavbarLanguage from "./NavbarLanguage";

type NavbarMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
};

const NavbarMenu: React.FC<NavbarMenuProps> = ({ anchorEl, open, onClose }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const handleExit = (): void => {
    onClose();
    navigate("/");
  };

  return (
    <Menu
      id="nav-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
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
        onClick={onClose}
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
        onClick={onClose}
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

        <NavbarLanguage />
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
        <LogoutIcon sx={{ fontSize: 20 }} />

        {t("header.exit")}
      </MenuItem>
    </Menu>
  );
};

export default NavbarMenu;
