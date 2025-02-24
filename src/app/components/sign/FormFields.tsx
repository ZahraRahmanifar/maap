import React from "react";
import { Grid, TextField } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import { styled } from "@mui/material/styles";

interface FormFieldsProps {
  userType: "company" | "regular";
  values: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

// Styled Error Text
const ErrorText = styled("span")(({ theme }) => ({
  color: theme.palette.error.main, // Use theme's error color
  fontSize: "0.875rem",
  marginTop: "4px",
  display: "block",
}));

const FormFields: React.FC<FormFieldsProps> = ({ userType, values, handleChange }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ marginTop: "1rem" }}>
        <Field
          as={TextField}
          name="firstName"
          label="First Name"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={values.firstName}
          required
          helperText={
            <ErrorMessage name="firstName" component={ErrorText} />
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          as={TextField}
          name="lastName"
          label="Last Name"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={values.lastName}
          required
          helperText={
            <ErrorMessage name="lastName" component={ErrorText} />
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          as={TextField}
          name="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={values.email}
          required
          helperText={
            <ErrorMessage name="email" component={ErrorText} />
          }
        />
      </Grid>
      {/* {userType === "company" && (
        <> */}
          <Grid item xs={12}>
            <Field
              as={TextField}
              name="companyName"
              label="Company Name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={values.companyName}
              required
              helperText={<ErrorMessage name="companyName" component={ErrorText} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              name="jobTitle"
              label="Job Title"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={values.jobTitle}
              required
              helperText={<ErrorMessage name="jobTitle" component={ErrorText} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              name="industry"
              label="Industry"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={values.industry}
              required
              helperText={<ErrorMessage name="industry" component={ErrorText} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              name="country"
              label="Country"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={values.country}
              required
              helperText={<ErrorMessage name="country" component={ErrorText} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              as={TextField}
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={values.phoneNumber}
              required
              helperText={<ErrorMessage name="phoneNumber" component={ErrorText} />}
            />
          </Grid>
       
      
      <Grid item xs={12}>
        <Field
          as={TextField}
          name="username"
          label="Username"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={values.username}
          required
          helperText={<ErrorMessage name="username" component={ErrorText} />}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          as={TextField}
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={values.password}
          required
          helperText={<ErrorMessage name="password" component={ErrorText} />}
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          as={TextField}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={values.confirmPassword}
          required
          helperText={<ErrorMessage name="confirmPassword" component={ErrorText} />}
        />
      </Grid>
    </Grid>
  );
};

export default FormFields;
