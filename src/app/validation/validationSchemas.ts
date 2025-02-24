import * as Yup from "yup";

const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .required("Password is required");

const baseSchema = {
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
};

 const validationSchemas = {
  regular: Yup.object().shape(baseSchema),
  company: Yup.object().shape({
    ...baseSchema,
    companyName: Yup.string().required("Company Name is required"),
    jobTitle: Yup.string().required("Job Title is required"),
    industry: Yup.string().required("Industry is required"),
    country: Yup.string().required("Country is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone Number must be numeric")
      .required("Phone Number is required"),
  }),
};
export default validationSchemas