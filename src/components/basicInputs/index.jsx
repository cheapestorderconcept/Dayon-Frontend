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

// custom select
export const CustomSelect = ({ name, options, i, useId, ...other }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const defaultConfiq = {
    select: true,
    variant: "outlined",
    fullWidth: true,
    ...other,
    ...field,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    defaultConfiq.error = true;
    defaultConfiq.helperText = meta.error;
  }
  return (
    <TextField {...defaultConfiq}>
      {options?.map((option, index) => {
        return (
          <MenuItem
            key={option._id || index}
            value={
              option?.branch_name ||
              option?.brand_name ||
              option?.supplier_name ||
              (useId ? option?._id : option?.product_name) ||
              option?.payment_type ||
              option?.expenses_category ||
              option?.name
            }
          >
            {option?.branch_name ||
              option?.brand_name ||
              option?.supplier_name ||
              option?.product_name ||
              option?.payment_type ||
              option?.expenses_category ||
              option?.name}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

//custom date input

export const CustomDate = ({ name, ...other }) => {
  const [field, meta] = useField(name);

  const defaultConfiq = {
    type: "date",
    variant: "outlined",
    ...field,
    ...other,
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    defaultConfiq.error = true;
    defaultConfiq.helperText = meta.error;
  }
  return <TextField {...defaultConfiq} />;
};

//Custom

// Custom button
export const CustomButton = ({ children, disabled, ...others }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };

  const defaultConfiq = {
    onClick: handleSubmit,
    variant: "contained",
    color: "primary",
    disabled: disabled,
    fullWidth: true,
  };

  return <Button {...defaultConfiq}>{children}</Button>;
};
