import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import SuccessModal from './SuccessModal';
import debounce from 'lodash.debounce';
import { signIn } from "next-auth/react";

interface SignUpFormProps {
  open: boolean;
  onClose: () => void;
  setShowSignIn: (show: boolean) => void;
  setShowSignUp: (show: boolean) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Message {
  text: string;
  type: 'success' | 'error';
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  companyName: Yup.string().when('userType', {
    is: (val: string) => val === 'company',
    then: () => Yup.string().required('Company name is required'),
    otherwise: () => Yup.string()
  }),
  jobTitle: Yup.string().when('userType', {
    is: (val: string) => val === 'company',
    then: () => Yup.string().required('Job title is required'),
    otherwise: () => Yup.string()
  }),
  industry: Yup.string().when('userType', {
    is: (val: string) => val === 'company',
    then: () => Yup.string().required('Industry is required'),
    otherwise: () => Yup.string()
  }),
  country: Yup.string().when('userType', {
    is: (val: string) => val === 'company',
    then: () => Yup.string().required('Country is required'),
    otherwise: () => Yup.string()
  }),
  phoneNumber: Yup.string().when('userType', {
    is: (val: string) => val === 'company',
    then: () => Yup.string()
      .required('Phone number is required')
      .matches(/^\+?1?\d{9,15}$/, 'Invalid phone number format'),
    otherwise: () => Yup.string()
      .matches(/^\+?1?\d{9,15}$/, 'Invalid phone number format')
  }),
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`signup-tabpanel-${index}`}
      aria-labelledby={`signup-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  open,
  onClose,
  setShowSignIn,
  setShowSignUp,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setMessage(null);
    formik.setFieldValue('userType', newValue === 0 ? 'company' : 'regular');
    formik.resetForm();
  };

  const handleSignUp = async (values: any) => {
    setLoading(true);
    setMessage(null);

    const userType = tabValue === 0 ? 'company' : 'regular';
    console.log('Current tab value:', tabValue);
    console.log('User type being sent:', userType);

    try {
      const requestData = {
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        first_name: values.firstName,
        last_name: values.lastName,
        user_type: userType,  // Changed from userType to user_type to match backend
        // Only include company-specific fields if user type is company
        ...(userType === 'company' && {
          company_name: values.companyName,
          job_title: values.jobTitle,
          industry: values.industry,
          country: values.country,
          phone_number: values.phoneNumber,
        }),
      };

      console.log('Sending signup data:', requestData);

      const response = await fetch('http://localhost:8000/users/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('Signup response:', data);

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        let errorMessage = '';
        if (typeof data.error === 'object') {
          errorMessage = Object.entries(data.error)
            .map(([key, value]) => {
              const displayKey = key
                .split('_')
                .map((word, index) => 
                  index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join('');
              return `${displayKey}: ${value}`;
            })
            .join(', ');
        } else if (typeof data === 'object') {
          errorMessage = Object.entries(data)
            .map(([key, value]) => {
              const displayKey = key
                .split('_')
                .map((word, index) => 
                  index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join('');
              return `${displayKey}: ${value}`;
            })
            .join(', ');
        } else {
          errorMessage = data.error || 'Registration failed';
        }
        setMessage({ text: errorMessage, type: 'error' });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage({ text: 'Network error occurred', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Debounced username check
  const debouncedUsernameCheck = React.useCallback(
    debounce(async (username: string, setFieldError: any) => {
      if (username.length >= 3) {
        try {
          const response = await fetch(`http://localhost:8000/users/check-username/${username}/`);
          const data = await response.json();
          if (data.exists) {
            setFieldError('username', 'Username is already taken');
          }
        } catch (error) {
          console.error('Username check failed:', error);
        }
      }
    }, 500),
    []
  );

  // Debounced email check
  const debouncedEmailCheck = React.useCallback(
    debounce(async (email: string, setFieldError: any) => {
      if (email && email.includes('@')) {
        try {
          const response = await fetch(`http://localhost:8000/users/check-email/${email}/`);
          const data = await response.json();
          if (data.exists) {
            setFieldError('email', 'Email is already registered');
          }
        } catch (error) {
          console.error('Email check failed:', error);
        }
      }
    }, 500),
    []
  );
const handleGoogleSignIn = async () => {
  try {
    setLoading(true);
    const result = await signIn("google", { callbackUrl: "/dashboard" }); // Adjust the callbackUrl as needed
    if (!result?.error) {
      // Handle successful sign-in, maybe redirect or show a success message
      console.log("Google sign-in successful", result);
    } else {
      // Handle error
      console.error("Google sign-in error", result?.error);
      setMessage({ text: "Google sign-in failed", type: "error" });
    }
  } catch (error) {
    console.error("Google sign-in error", error);
    setMessage({
      text: "An error occurred during Google sign-in",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      jobTitle: '',
      industry: '',
      country: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
      userType: tabValue === 0 ? 'company' : 'regular',
    },
    validationSchema,
    onSubmit: handleSignUp,
  });

  // Add field-level validation
  useEffect(() => {
    if (formik.values.username) {
      debouncedUsernameCheck(formik.values.username, formik.setFieldError);
    }
    if (formik.values.email) {
      debouncedEmailCheck(formik.values.email, formik.setFieldError);
    }
  }, [formik.values.username, formik.values.email]);

  const handleSignInClick = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const commonFields = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email Address' },
    { name: 'companyName', label: 'Company Name' },
    { name: 'jobTitle', label: 'Job Title' },
    { name: 'industry', label: 'Industry' },
    { name: 'country', label: 'Country' },
    { name: 'phoneNumber', label: 'Phone Number' },
    { name: 'username', label: 'Username' },
  ];

  const renderTextField = (name: string, label: string) => (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      type={name === 'password' ? (showPassword ? 'text' : 'password') : 
           name === 'confirmPassword' ? (showConfirmPassword ? 'text' : 'password') : 
           'text'}
      variant="outlined"
      margin="normal"
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      disabled={loading}
      InputProps={{
        ...(name === 'password' && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }),
        ...(name === 'confirmPassword' && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }),
      }}
      sx={{ mb: 2 }}
    />
  );

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="signup-modal"
        aria-describedby="signup-form">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            bgcolor: "#1B4242",
            borderRadius: 1,
            p: 4,
            color: "white",
            maxHeight: "90vh",
            overflowY: "auto",
          }}>
          <Typography variant="h5" component="h2" align="center" sx={{ mb: 3 }}>
            Sign up
          </Typography>

          {message && (
            <Alert
              severity={message.type}
              sx={{ mb: 2 }}
              onClose={() => setMessage(null)}>
              {message.text}
            </Alert>
          )}

          <Paper sx={{ borderRadius: 1, overflow: "hidden" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                ".MuiTab-root": {
                  color: "#666",
                  "&.Mui-selected": {
                    color: "#1B4242",
                    fontWeight: "bold",
                  },
                },
                ".MuiTabs-indicator": {
                  backgroundColor: "#1B4242",
                },
              }}>
              <Tab label="Company User" />
              <Tab label="Regular user" />
            </Tabs>

            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ px: 3, pb: 3 }}>
                {commonFields.map((field) =>
                  renderTextField(field.name, field.label)
                )}

                {renderTextField("password", "Password")}
                {renderTextField("confirmPassword", "Confirm Password")}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mb: 2,
                    bgcolor: "#1B4242",
                    "&:hover": {
                      bgcolor: "#2C5C5C",
                    },
                  }}>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign up"
                  )}
                </Button>

                {tabValue === 1 && (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    sx={{
                      mb: 2,
                      color: "#666",
                      borderColor: "#666",
                      "&:hover": {
                        borderColor: "#1B4242",
                        color: "#1B4242",
                        backgroundColor: "rgba(27, 66, 66, 0.04)",
                      },
                    }}>
                    Continue with Google
                  </Button>
                )}
              </Box>
            </form>
          </Paper>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" sx={{ color: "#fff" }}>
              Already have an account?{" "}
              <Typography
                component="a"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignInClick();
                }}
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}>
                Log in
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Modal>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Your account has been created successfully! You can now sign in to access your account."
        onSignIn={handleSignInClick}
      />
    </>
  );
};

export default SignUpForm;
