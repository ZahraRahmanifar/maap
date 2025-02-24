import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";مث
import Stack from "@mui/material/Stack";
import CustomTextField from "./CustomTextField"; // فرض بر اینکه این کامپوننت سفارشی خود شماست
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const SignIn = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [activeButton, setActiveButton] = useState("Company User"); // به طور پیش‌فرض دکمه "Company User" فعال است
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        valid = false;
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    if (valid) {
      alert("Form submitted successfully!");
    }
  };

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  return (
    <>
      
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
        fullScreen={fullScreen}
        sx={{
          "& .MuiDialog-paper": {
            width: "500px",
            maxWidth: "none",
            px: "2rem",
          },
        }}
      >
        <DialogTitle>
          <Typography textAlign={"center"} variant="h5">
            Sign In
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Stack component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <Box
              backgroundColor={"#f0f0f0"}
              display={"flex"}
              justifyContent={"center"}  // برای قرار دادن دکمه‌ها در وسط
              alignItems={"center"}
              flexDirection={{ xs: "column", md: "row" }}
              mx={"auto"}
              mb={3}
            >
              {/* دکمه Regular User */}
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                mb={{ xs: "20px", md: "0" }}
              >
                <Button
                  variant="text"
                  onClick={() => handleButtonClick("Regular User")}
                  sx={{
                    width: "200px",
                    backgroundColor:
                      activeButton === "Regular User" ? "green" : "transparent",
                    color: activeButton === "Regular User" ? "white" : "black",
                    ":hover": {
                      backgroundColor:
                        activeButton === "Regular User" ? "darkgreen" : "",
                    },
                  }}
                >
                  Regular User
                </Button>
              </Box>

              {/* دکمه Company User */}
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  variant="text"
                  onClick={() => handleButtonClick("Company User")}
                  sx={{
                    width: "200px",
                    backgroundColor:
                      activeButton === "Company User" ? "green" : "transparent",
                    color: activeButton === "Company User" ? "white" : "black",
                    ":hover": {
                      backgroundColor:
                        activeButton === "Company User" ? "darkgreen" : "",
                    },
                  }}
                >
                  Company User
                </Button>
              </Box>
            </Box>

            {/* فیلدهای ورودی */}
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={12}>
                <CustomTextField
                  placeholder="Username"
                  required
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  placeholder="Password"
                  required
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  variant="filled"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  placeholder="Confirm Password"
                  required
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  variant="filled"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={3}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "green", color: "white", width: "100%" }}
              >
                Sign Up
              </Button>
            </Box>

            <Divider sx={{ my: 2 }}>or</Divider>

            {/* دکمه Continue with Google */}
            <Box width={"100%"} display={"flex"} justifyContent={"center"} mt={3} mb={3}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#808080", // رنگ خاکی دکمه
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  ":hover": {
                    backgroundColor: "#696969", // رنگ دکمه در حالت hover
                  },
                }}
              >
                <img
                  src="./image/google.jpg"
                  alt="googleicon"
                  width="15px"
                  height="15px"
                  style={{ marginRight: "10px" }}
                />
                <Typography fontSize={"14px"}>Continue with Google</Typography>
              </Button>
            </Box>

            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Typography fontSize={"11px"}>
                Already have an account?{" "}
                <Link href="#">Login</Link>
              </Typography>
            </Box>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignIn;
