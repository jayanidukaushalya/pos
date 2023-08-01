/* eslint-disable react/prop-types */
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function SuccessAlert({ message, severity, isFixed }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Collapse
        sx={{
          ...(isFixed && { position: "fixed", bottom: "10px", left: "20px" }),
        }}
        in={open}
      >
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </>
  );
}
