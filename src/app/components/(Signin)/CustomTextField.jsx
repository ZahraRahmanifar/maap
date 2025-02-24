import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CustomTextField = ({
  dir,
  label,
  variant = "outlined",
  type = "text",
  size = "small",
  color = "primary",
  showIconPassword = false,
  placeholder = "", 
  error = null,
  helperText = " ",
  required = false, 
  ...rest 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      dir={dir}
      variant={variant}
      size={size}
      color={color}
      label={label}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      placeholder={placeholder}
      error={!!error}
      helperText={error ? error.message : helperText}
      required={required}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        endAdornment: showIconPassword && type === "password" && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{ width: "100%" }}
      {...rest} 
    />
  );
};

export default CustomTextField;