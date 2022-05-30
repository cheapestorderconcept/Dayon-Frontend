import { TextField, MenuItem, Button, Box } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { getBrands } from "src/statesManagement/store/actions/brand-action";
import { products } from "src/__mocks__/products";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

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
// searchable search bar

export const SearchableSelect = ({ name, title, options, id, i, useId,setNameToValue,setselectedService, ...other }) => {
 
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { setFieldValue } = useFormikContext();


  return (
    <Autocomplete
      id={id}
      sx={{ width: 300 }}
      name={name}
      options={options}
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id || value.product_id }
      onChange={(event, newValue) => {
        setValue(newValue);
        setselectedService(newValue)
        setFieldValue(name, newValue?._id || newValue?.product_id || "");
      }}
      //rectify undefined as label
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      autoHighlight
      getOptionLabel={(option) => (option ? option.product_name ||option?.service_name || option.first_name + " " + option.last_name: "")}
      renderOption={(props, option) => (
          //below is for product and customers
        <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
        
          {option ? option.product_name ||option?.service_name || option.first_name + " " + option.last_name : "" }
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label={title || "Choose Product"} />}
    />
  );
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
      case "customers":
        return useId ? option._id : `${option.first_name + " " + option.last_name}`;
      case "service_categories":
        return useId ? option._id : `${option.categories_name}`;

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
