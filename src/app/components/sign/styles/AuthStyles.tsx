import { styled } from "@mui/material/styles";
import { Box, TextField, Button, ToggleButtonGroup, Typography, Link } from "@mui/material";

export const AuthContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: '90%',
  backgroundColor: '#1B4242',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#1B4242',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#00ffff',
    borderRadius: '4px',
  },
}));

export const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderRadius: '4px',
    '& fieldset': {
      borderColor: '#E0E0E0',
    },
    '&:hover fieldset': {
      borderColor: '#00ffff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00ffff',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '12px',
  },
});

export const AuthButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1B4242',
  color: '#fff',
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: '#2C5C5C',
  },
  '&.Mui-disabled': {
    backgroundColor: '#cccccc',
    color: '#666666',
  },
}));

export const GoogleButton = styled(Button)({
  backgroundColor: 'white',
  color: '#1B4242',
  padding: '12px',
  border: '1px solid #E0E0E0',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#00ffff',
  },
});

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  backgroundColor: 'white',
  borderRadius: '4px',
  width: '100%',
  '& .MuiToggleButton-root': {
    flex: 1,
    color: '#1B4242',
    backgroundColor: '#E0E0E0',
    '&.Mui-selected': {
      backgroundColor: '#5C8374',
      color: 'white',
      '&:hover': {
        backgroundColor: '#5C8374',
      },
    },
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
});

export const StyledButton = styled(Button)({
  backgroundColor: '#5C8374',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1B4242',
  },
  textTransform: 'none',
  fontWeight: 'bold',
  borderRadius: '4px',
  padding: '12px 24px',
});

export const AuthLink = styled(Link)({
  marginTop: '1rem',
  textAlign: 'center',
  '& a': {
    color: '#1B4242',
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const VerificationContainer = styled(Box)({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  marginTop: "1rem",
  "& .MuiTextField-root": {
    width: "3rem",
    "& input": {
      textAlign: "center",
      fontSize: "1.5rem",
      padding: "0.5rem",
    },
  },
});
