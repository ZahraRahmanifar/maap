import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ControlPanel = () => {
  return (
    <Box sx={{ position: 'absolute', right: 16, top: '40%', display: 'flex', flexDirection: 'column' }}>
      <IconButton color="primary" aria-label="zoom-in">
        <AddIcon />
      </IconButton>
      <IconButton color="primary" aria-label="zoom-out">
        <RemoveIcon />
      </IconButton>
      <IconButton color="primary" aria-label="help">
        <HelpOutlineIcon />
      </IconButton>
    </Box>
  );
};

export default ControlPanel;
