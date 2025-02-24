'use client';
import { Box } from '@mui/material';

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ height: '100%', backgroundColor: '#f9f9f9' }}>
      {children}
    </Box>
  );
}
