import React, { InputHTMLAttributes, useState } from "react";
import { TextField } from "formik-material-ui";
import { Field, useField } from "formik";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  password?: boolean;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const [, { error }] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  if (props.password) {
    return (
      <FormControl variant="outlined" margin="normal" error={!!error} fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((pv) => !pv)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
          {...(props as any)}
        />
        <FormHelperText id="component-error-text">
          {error && error}
        </FormHelperText>
      </FormControl>
    );
  }
  return (
    <FormControl margin="normal" error={!!error} fullWidth>
      <Field component={TextField} variant="outlined" {...props} />
    </FormControl>
  );
};

export default InputField;
