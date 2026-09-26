import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type FormValues = {
  userName: string;
};

type UserNameError = "required" | "minLength" | "maxLength";

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      userName: "",
    },
  });

  const helperText: Record<UserNameError, string> = {
    required: t("errors.required"),
    minLength: t("errors.minLength"),
    maxLength: t("errors.maxLength"),
  };

  const onSubmit = (data: FormValues) => {
    const name = data.userName.trim();

    if (!name) {
      return;
    }

    navigate("/dashboard", {
      state: {
        toast: {
          message: t("toast.welcome", { name }),
        },
      },
    });

    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      <TextField
        id="user-name"
        label={t("login.label")}
        fullWidth
        error={!!errors.userName}
        helperText={
          errors.userName?.type
            ? helperText[errors.userName.type as UserNameError]
            : " "
        }
        {...register("userName", {
          required: true,
          minLength: 2,
          maxLength: 31,
        })}
        sx={{
          "& .MuiInputLabel-root": {
            color: "rgba(255,255,255,0.65)",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#64b5f6",
          },

          "& .MuiOutlinedInput-root": {
            color: "#fff",

            "& fieldset": {
              borderColor: "rgba(255,255,255,0.2)",
            },

            "&:hover fieldset": {
              borderColor: "rgba(255,255,255,0.4)",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#2196f3",
            },
          },

          "& .MuiFormHelperText-root": {
            minHeight: 20,
            marginInlineStart: 0,
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
          py: 1.35,
          borderRadius: 2,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          background: "linear-gradient(135deg, #2196f3, #7c4dff)",
          boxShadow: "0 8px 25px rgba(33,150,243,0.25)",
          transition: "all 0.25s ease",

          "&:hover": {
            background: "linear-gradient(135deg, #42a5f5, #9575cd)",
            transform: "translateY(-2px)",
            boxShadow: "0 12px 30px rgba(33,150,243,0.35)",
          },
        }}
      >
        {t("login.submit")}
      </Button>
    </Box>
  );
};

export default LoginForm;
