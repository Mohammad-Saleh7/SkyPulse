import React from "react";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";

type NavbarSettingsProps = {
  menuOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const NavbarSettings: React.FC<NavbarSettingsProps> = ({
  menuOpen,
  onClick,
}) => {
  const { t } = useTranslation();

  return (
    <IconButton
      id="settings-button"
      aria-controls={menuOpen ? "nav-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={menuOpen ? "true" : undefined}
      onClick={onClick}
      color="inherit"
      size="medium"
      aria-label={t("header.mode")}
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
      <SettingsIcon sx={{ fontSize: 21 }} />
    </IconButton>
  );
};

export default NavbarSettings;
