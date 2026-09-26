import React from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

const NavbarLanguage: React.FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <Box sx={{ width: 170 }}>
      <ButtonGroup
        size="small"
        variant="outlined"
        fullWidth
        sx={{
          flexDirection: i18n.language === "fa" ? "row-reverse" : "row",
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
  );
};

export default NavbarLanguage;
