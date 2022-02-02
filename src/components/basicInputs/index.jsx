import { TextField, MenuItem, Button } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { getBrands } from "src/statesManagement/store/actions/brand-action";
import { products } from "src/__mocks__/products";

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
export const CustomSelect = ({ name, options, id, i, useId, ...other }) => {
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

  const returnSelect = ({ id, useId, option }) => {
    switch (id) {
      case "suppliers":
        return option.supplier_name || option.supplier;
      case "products":
        return useId ? option._id : option.product_name;
      case "brands":
        return option.brand_name;
      case "branch":
        return option.branch_name;
      case "paymentType":
        return option.payment_type;
      case "expensesCategories":
        return option.expenses_category;
      case "roles":
        return option.name;

      default:
        "";
    }
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
            value={returnSelect({ id: id, useId: useId, option: option })}
          >
            {returnSelect({ id: id, option: option })}
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
