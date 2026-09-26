import React from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        top: {
          xs: 16,
          sm: 24,
        },
      }}
    >
      <Alert
        onClose={onClose}
        icon={false}
        sx={{
          width: "100%",
          minWidth: {
            xs: "calc(100vw - 32px)",
            sm: 380,
          },

          padding: 0,

          borderRadius: 3,

          color: "#fff",

          background:
            "linear-gradient(135deg, rgba(20,20,20,0.96), rgba(8,8,8,0.94))",

          border: "1px solid rgba(255,255,255,0.12)",

          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",

          boxShadow: `
            0 20px 50px rgba(0,0,0,0.55),
            0 0 0 1px rgba(255,255,255,0.03) inset
          `,

          overflow: "hidden",

          "& .MuiAlert-message": {
            width: "100%",
            padding: 0,
          },

          "& .MuiAlert-action": {
            color: "rgba(255,255,255,0.55)",
            marginRight: 0,
          },

          "& .MuiAlert-action .MuiIconButton-root:hover": {
            background: "rgba(255,255,255,0.08)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.5,
          }}
        >
          {/* Success Icon */}
          <Box
            sx={{
              width: 38,
              height: 38,
              flexShrink: 0,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              borderRadius: "50%",

              background: "rgba(76,175,80,0.12)",

              border: "1px solid rgba(76,175,80,0.25)",

              boxShadow: "0 0 18px rgba(76,175,80,0.12)",
            }}
          >
            <CheckCircleOutlineRoundedIcon
              sx={{
                fontSize: 22,
                color: "#66bb6a",
              }}
            />
          </Box>

          {/* Message */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.5,
              }}
            >
              {message}
            </Typography>
          </Box>
        </Box>

        {/* Bottom progress line */}
        <Box
          sx={{
            height: 2,
            width: "100%",

            background: "linear-gradient(90deg, #4caf50, #81c784)",

            transformOrigin: "left",

            animation: "toastProgress 3.5s linear forwards",

            "@keyframes toastProgress": {
              from: {
                transform: "scaleX(1)",
              },
              to: {
                transform: "scaleX(0)",
              },
            },
          }}
        />
      </Alert>
    </Snackbar>
  );
};

export default Toast;
