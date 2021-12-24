import { TextField, MenuItem, Button } from "@mui/material";
import { useField, useFormikContext } from "formik";

export const CustomTextField = ({ name, ...other }) => {
  const [field, meta] = useField(name);
  const defaultConfiq = {
    ...field,
    ...other,
    variant: "outlined",
    fullWidth: true,
  };
  if (meta && meta.touched && meta.error) {
    defaultConfiq.error = true;
    defaultConfiq.helperText = meta.error;
  }
  return <TextField {...defaultConfiq} />;
};

export const CustomSelect = ({ name, option, ...other }) => {
  const [field, meta] = useField(name);
  const defaultConfiq = {
    select: true,
    variant: "outlined",
    fullWidth: true,
    ...other,
    ...field,
  };
  if (meta && meta.touched && meta.error) {
    defaultConfiq.error = true;
    defaultConfiq.helperText = meta.error;
  }
  return <TextField {...defaultConfiq} />;
};

export const CustomButton = ({ children, ...other }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };
  const defaultConfiq = {
    onClick: handleSubmit,
    variant: "contained",
    color: "primary",
    fullWidth: true,
  };

  return <Button {...defaultConfiq}>{children}</Button>;
};
