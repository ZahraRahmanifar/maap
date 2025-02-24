"use client";
import React, { useState } from "react";
import SignInForm from "./components/sign/SignInForm";
import SignUpForm from "./components/sign/SignUpForm";
import { ForgotPasswordForm } from "./components/sign/ForgotPasswordForm";
import { Box } from "@mui/material";

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSignInClose = () => {
    setShowSignIn(false);
  };

  const handleSignUpClose = () => {
    setShowSignUp(false);
    // When closing signup, show signin
    setShowSignIn(true);
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false);
    // When closing forgot password, show signin
    setShowSignIn(true);
  };

  const handleSignUpClick = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSignInClick = () => {
    setShowSignUp(false);
    setShowForgotPassword(false);
    setShowSignIn(true);
  };

  const handleForgotPasswordClick = () => {
    setShowSignIn(false);
    setShowForgotPassword(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {showSignUp && (
        <SignUpForm
          open={showSignUp}
          onClose={handleSignUpClose}
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
        />
      )}
      {showSignIn && (
        <SignInForm 
          open={showSignIn} 
          onClose={handleSignInClose}
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
          setShowForgotPassword={setShowForgotPassword}
        />
      )}
      {showForgotPassword && (
        <ForgotPasswordForm
          open={showForgotPassword}
          onClose={handleForgotPasswordClose}
          setShowSignIn={setShowSignIn}
          setShowForgotPassword={setShowForgotPassword}
        />
      )}
    </Box>
  );
}
