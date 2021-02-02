import React, { InputHTMLAttributes } from "react";
import { TextField } from "formik-material-ui";
import { Field, useField } from "formik";
import { FormControl } from "@material-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const [, { error }] = useField(props);
  return (
    <FormControl margin="normal" error={!!error} fullWidth>
      <Field component={TextField} variant="outlined" {...props} />
    </FormControl>
  );
};

export default InputField;
