import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";

const AlertBox = ({ message, open, severity, setopen }) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setopen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Stack>
  );
};

export default AlertBox;
