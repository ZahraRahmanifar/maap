'use client';
import { createTheme } from '@mui/material/styles';
import { Hind } from 'next/font/google';



const hind = Hind({
  weight: "400", // Verify that '100' is available; otherwise use '400' or another valid weight
  subsets: ["latin"],
  display: 'swap'
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#05297F',  // Primary-500
      light: '#EEF2F5', // Primary-200
      dark: '#001E67',  // Primary-700
    },
    secondary: {
      main: '#FC9D9D',  // Secondary-500
      light: '#FBDADA', // Secondary-200
      dark: '#EA001B',  // Secondary-600
    },
    background: {
      default: '#FFFFFF',  // White
      paper: '#f3f4f6',    // Gray-100
    },
    text: {
      primary: '#1f1f1f',  // Dark
      secondary: '#4b5563', // Gray-600
      disabled: '#9ca3af',  // Gray-400
    },
    divider: '#e5e7eb',     // Gray-200
  },
  typography: {
    fontFamily: hind.style.fontFamily,
    
    h1: {
      fontSize: '4rem',
      fontWeight: 'bold',
      lineHeight: '5rem',
      letterSpacing: '0.0375rem',
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 'bold',
      lineHeight: '2rem',
      letterSpacing: '0.035rem',
    },
    h3: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      lineHeight: '3.5rem',
      letterSpacing: '0.05rem',
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 'bold',
      lineHeight: '2.75rem',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,  // SemiBold
      lineHeight: '2.5rem',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,  // SemiBold
      lineHeight: '2rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: '1.5rem',
      fontWeight: 600,  // SemiBold for extra small text
    },
  },
});

export default theme;

