import { Typography } from "@mui/material";
import React from "react";
import { COMPANY_NAME } from "src/utils/company_details";

const PrintingHeader = ({ title }) => {
  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "center", mb: 3 }}>
       {COMPANY_NAME}
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {title}
      </Typography>
    </>
  );
};

export default PrintingHeader;
