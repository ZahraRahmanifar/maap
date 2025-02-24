import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import './globals.css';
import type { Metadata } from "next";
import { Hind } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const hind = Hind({
  weight: "400", // Verify that '100' is available; otherwise use '400' or another valid weight
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default:"TerraNEXT",
    template:"TerraNEXT|%s"
  },
  description: "Modern stylist wear store!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={hind.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Toaster position="top-right" />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
