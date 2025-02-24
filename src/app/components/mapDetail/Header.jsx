import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Stack,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
  Box,
} from "@mui/material";

const Header = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [openSignIn, setOpenSignIn] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSignInClick = () => {
    setOpenSignIn(true);
  };

  const handleSignInClose = () => {
    setOpenSignIn(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: isMobile ? "transparent" : "#ffffff",
          boxShadow: "none",
          width: "100%",
        }}
      >
        <Toolbar>
          <Stack
            direction="row"
            justifyContent={isMobile ? "flex-end" : "space-between"}
            sx={{ width: "100%", marginLeft: isMobile ? "0" : "8%" }}
          >
            {/* نمایش تب‌ها فقط در حالت دسکتاپ */}
            {!isMobile && (
              <Tabs
                sx={{ mt: 2 }}
                value={selectedTab}
                onChange={handleTabChange}
                textColor="#00897B"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#00897B",
                    height: "3px",
                    borderRadius: "50px",
                  },
                }}
              >
                <Tab
                  label="Map"
                  sx={{ color: selectedTab === 0 ? "#00897B" : "#4DB6AC" }}
                />
                <Tab
                  label="Lorem"
                  sx={{ color: selectedTab === 1 ? "#00897B" : "#4DB6AC" }}
                />
                <Tab
                  label="Lorem"
                  sx={{ color: selectedTab === 2 ? "#00897B" : "#4DB6AC" }}
                />
              </Tabs>
            )}

            {/* نمایش انتخاب زبان فقط در حالت دسکتاپ */}
            {!isMobile && (
              <FormControl sx={{ minWidth: 99, mt: 1.5, ml: "auto" }}>
                <Select
                  id="language-select"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                  sx={{
                    color: "#00897B",
                    fontSize: isMobile ? "12px" : "15px",
                    bgcolor: "transparent",
                    border: "none",
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                  displayEmpty
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                </Select>
              </FormControl>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* <SignIn open={openSignIn} onClose={handleSignInClose} /> */}
    </>
  );
};

export default Header;
