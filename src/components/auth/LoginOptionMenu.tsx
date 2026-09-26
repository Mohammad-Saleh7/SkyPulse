import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import ModeToggle from "../Modetoggle";
import i18n from "../../i18n";

const LoginOptionMenu: React.FC = () => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label={t("header.language")}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 10,
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRadius: 2,

          "&:hover": {
            background: "rgba(255,255,255,0.12)",
          },
        }}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: -1,
              minWidth: 220,
              p: 1,
              borderRadius: 3,
              color: "#fff",
              background: "rgba(25,25,25,0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.12)",
            },
          },
        }}
      >
        <MenuItem
          disableRipple
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 1,
            mb: 1,
            borderRadius: 2,
          }}
        >
          <Box sx={{ fontSize: 14 }}>{t("header.language")}</Box>

          <ButtonGroup
            size="small"
            variant="outlined"
            fullWidth
            sx={{
              direction: i18n.language === "fa" ? "rtl" : "ltr",

              "& .MuiButton-root": {
                color: "#fff",
                borderColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <Button onClick={() => i18n.changeLanguage("en")}>
              {t("header.english")}
            </Button>

            <Button onClick={() => i18n.changeLanguage("fa")}>
              {t("header.persian")}
            </Button>
          </ButtonGroup>
        </MenuItem>

        <MenuItem
          disableRipple
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 1,
            borderRadius: 2,
          }}
        >
          <Box sx={{ fontSize: 14 }}>{t("header.mode")}</Box>

          <ModeToggle />
        </MenuItem>
      </Menu>
    </>
  );
};

export default LoginOptionMenu;
