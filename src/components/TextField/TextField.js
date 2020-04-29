import React from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

const CustomTextField = ({
  placeholder,
  variant,
  margin,
  label,
  multiline,
  rows,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      {...field}
      rows={rows}
      multiline={multiline}
      variant={variant}
      margin={margin}
      label={label}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default CustomTextField;
