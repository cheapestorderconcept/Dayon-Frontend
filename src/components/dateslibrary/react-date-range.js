import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

const ReactDatePicker = ({ handleSelect, selectionRange, showSelectionPreview }) => {
  return <DateRangePicker showSelectionPreview ranges={selectionRange} onChange={handleSelect} />;
};

export default ReactDatePicker;
