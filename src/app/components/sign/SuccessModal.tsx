import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/navigation';

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  onSignIn: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  message,
  onSignIn,
}) => {
  const router = useRouter();

  const handleGoHome = () => {
    onClose();
    router.push('/');
  };

  const handleSignIn = () => {
    onClose();
    onSignIn();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="success-modal"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 400,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: 64,
              color: '#1B4242',
              mb: 2,
            }}
          />
          <Typography variant="h5" component="h2" gutterBottom>
            Success!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {message}
          </Typography>
          <Stack spacing={2} direction="column">
            <Button
              variant="contained"
              onClick={handleSignIn}
              fullWidth
              sx={{
                bgcolor: '#1B4242',
                '&:hover': {
                  bgcolor: '#2C5C5C',
                },
              }}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              onClick={handleGoHome}
              fullWidth
              sx={{
                color: '#1B4242',
                borderColor: '#1B4242',
                '&:hover': {
                  borderColor: '#2C5C5C',
                  bgcolor: 'rgba(27, 66, 66, 0.04)',
                },
              }}
            >
              Go to Home Page
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
