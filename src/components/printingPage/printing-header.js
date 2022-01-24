import { Typography } from "@mui/material";
import React from "react";

const PrintingHeader = ({ title }) => {
  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "center", mb: 3 }}>
        Adeshex Global
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {title}
      </Typography>
    </>
  );
};

export default PrintingHeader;
