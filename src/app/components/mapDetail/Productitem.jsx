import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const ProductItem = ({ name, description }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>
        <ImageIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={<Typography variant="subtitle1">{name}</Typography>}
      secondary={<Typography variant="body2" color="textSecondary">{description}</Typography>}
    />
  </ListItem>
);

export default ProductItem;
