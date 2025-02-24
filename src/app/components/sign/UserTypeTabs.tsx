import React from "react";
import { Tabs, Tab } from "@mui/material";

interface UserTypeTabsProps {
  userType: "regular" | "company";
  setUserType: (type: "regular" | "company") => void;
}

export const UserTypeTabs: React.FC<UserTypeTabsProps> = ({
  userType,
  setUserType,
}) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setUserType(newValue === 0 ? "company" : "regular");
  };

  return (
    <Tabs
      value={userType === "company" ? 0 : 1}
      onChange={handleTabChange}
      centered
    >
      <Tab label="Company User" />
      <Tab label="Regular User" />
    </Tabs>
  );
};
