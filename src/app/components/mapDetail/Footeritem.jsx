import React from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FooterItem = ({ text, onRemove }) => (
  <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="delete" onClick={onRemove}>
        <CloseIcon />
      </IconButton>
    }
  >
    <ListItemText primary={text} />
  </ListItem>
);

export default FooterItem;
