import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShareIcon from "@mui/icons-material/Share";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMediaQuery } from "@mui/material";

export default function VerticalToggleButtons({ mapZoom, setMapZoom, selectedProduct }) {
  const [view, setView] = React.useState("list");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  const increaseZoom = () => {
    setMapZoom((prevZoom) => prevZoom - 1);
  };

  const decreaseZoom = () => {
    setMapZoom((prevZoom) => prevZoom + 1);
  };

  // Function to share product information
  const handleShareProduct = () => {
    if (selectedProduct) {
      const subject = `Product Information: ${selectedProduct.name}`;
      const body = `Hello,\n\nI am sharing the information of the product I viewed:\n\n` +
        `Product Name: ${selectedProduct.name}\n` +
        `Description: ${selectedProduct.description}\n` +
        `Image Link: ${selectedProduct.image_url}\n\n` +
        `Best regards`;

      // Open email link with information
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      alert("No product selected for sharing.");
    }
  };

  const buttons = [
    { value: "add", icon: <AddIcon />, action: increaseZoom },
    { value: "remove", icon: <RemoveIcon />, action: decreaseZoom },
    { value: "share", icon: <ShareIcon />, action: handleShareProduct },
    { value: "settings", icon: <SettingsIcon /> },
    { value: "help", icon: <HelpIcon /> },
  ];

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={view}
      exclusive
      onChange={handleChange}
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "35px",
        zIndex: 1000,
        borderRadius: "20px",
        background: "#ffffff",
        "& .MuiToggleButton-root": {
          border: "none",
          padding: "8px",
          ...(isMobile && {
            padding: "4px",
          }),
        },
        ...(isMobile && {
          bottom: "10px",
          right: "10px",
          borderRadius: "10px",
        }),
      }}
    >
      {buttons.map(({ value, icon, action }) => (
        <ToggleButton
          key={value}
          value={value}
          aria-label={value}
          onClick={action}
          sx={isMobile ? { padding: "4px" } : {}}
        >
          {React.cloneElement(icon, { sx: { color: "#00897B", ...(isMobile && { fontSize: "small" }) } })}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
