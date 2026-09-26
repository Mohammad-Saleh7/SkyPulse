import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useTranslation } from "react-i18next";

type NavbarSearchProps = {
  setCity: (city: string) => void;
};

const NavbarSearch: React.FC<NavbarSearchProps> = ({ setCity }) => {
  const { i18n, t } = useTranslation();

  const [input, setInput] = useState("");

  const isRtl = i18n.language === "fa";

  const handleSearch = (): void => {
    const cityName = input.trim();

    if (!cityName) {
      return;
    }

    setCity(cityName);
    setInput("");
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSearch();
    }
  };

  const searchButton = (
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
          color: theme.palette.mode === "dark" ? "#4CDFE8" : "#007FFF",

          background:
            theme.palette.mode === "dark"
              ? "rgba(76,223,232,0.07)"
              : "rgba(0,127,255,0.06)",
        },
      })}
    >
      <SearchRoundedIcon sx={{ fontSize: 19 }} />
    </IconButton>
  );

  return (
    <TextField
      placeholder={t("header.search")}
      variant="outlined"
      size="small"
      value={input}
      onChange={(event) => {
        setInput(event.target.value);
      }}
      onKeyDown={handleKeyDown}
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

        "& .MuiOutlinedInput-input": {
          textAlign: isRtl ? "right" : "left",
        },
      })}
      slotProps={{
        input: {
          ...(isRtl
            ? {
                startAdornment: (
                  <InputAdornment position="start">
                    {searchButton}
                  </InputAdornment>
                ),
              }
            : {
                endAdornment: (
                  <InputAdornment position="end">{searchButton}</InputAdornment>
                ),
              }),
        },
      }}
    />
  );
};

export default NavbarSearch;
