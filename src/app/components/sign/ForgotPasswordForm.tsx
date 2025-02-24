'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import VerifyCodeForm from './VerifyCodeForm';
import ResetPasswordForm from './ResetPasswordForm';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  CircularProgress,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ForgotPasswordFormProps {
  open: boolean;
  onClose: () => void;
  setShowSignIn: (show: boolean) => void;
  setShowForgotPassword: (show: boolean) => void;
}

export const ForgotPasswordForm = ({
  open,
  onClose,
  setShowSignIn,
  setShowForgotPassword,
}: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: verify code, 3: reset password
  const [verificationCode, setVerificationCode] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/users/password-reset/request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Verification code sent to your email!');
        setStep(2);
      } else {
        toast.error(data.message || 'Failed to send verification code');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSuccess = (code: string) => {
    setVerificationCode(code);
    setStep(3);
  };

  const handlePasswordResetSuccess = () => {
    setShowForgotPassword(false);
    setShowSignIn(true);
    toast.success('Password reset successfully! Please sign in with your new password.');
  };

  if (!open) return null;

  if (step === 2) {
    return <VerifyCodeForm email={email} onSuccess={handleVerificationSuccess} />;
  }

  if (step === 3) {
    return <ResetPasswordForm 
      email={email} 
      code={verificationCode} 
      onSuccess={handlePasswordResetSuccess}
    />;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="forgot-password-modal"
      aria-describedby="forgot-password-form"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 400,
          bgcolor: '#1B4242',
          borderRadius: 1,
          p: 4,
          color: 'white',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: 'white',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          component="h2"
          align="center"
          sx={{ mb: 3 }}
        >
          Forgot Password
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}
        >
          Enter your email address and we'll send you a verification code
        </Typography>

        <form onSubmit={handleEmailSubmit}>
          <TextField
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: '#2C5C5C',
              '&:hover': {
                bgcolor: '#3A7A7A',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(44, 92, 92, 0.5)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Verification Code'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ForgotPasswordForm;