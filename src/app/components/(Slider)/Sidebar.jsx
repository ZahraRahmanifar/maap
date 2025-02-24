import React, { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Sidebar = ({
  yearRange,
  setYearRange,
  selectedCountry,
  setSelectedCountry,
  countryCoordinates,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const marks = [
    { value: 2000, label: "2000" },
    { value: 2010, label: "2010" },
    { value: 2015, label: "2015" },
    { value: 2020, label: "2020" },
    { value: 2030, label: "2030" },
  ];

  return (
    <Grid
      container
      sx={{
        width: "100%",
        // height: "550px",
        bgcolor: "background.paper",
        padding: 3,
      }}
    >
      {/* Year Range Section */}
      <Grid size={{ xs: 12 }}>
        <Typography>Select Year</Typography>
        <Slider
          value={yearRange}
          onChange={(event, newValue) => setYearRange(newValue)}
          valueLabelDisplay="auto"
          min={2000}
          max={2030}
          marks={marks}
          sx={{ color: "#00897B" }}
        />
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
          This sidebar allows you to select a specific range of years and filter
          data.
        </Typography>

        <Divider sx={{ mt: 2 }} />

        {/* Country Selection Accordion */}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Countries</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ maxHeight: "90px", overflowY: "auto" }}>
            <List>
              {countryCoordinates ? (
                Object.values(countryCoordinates).map((country, index) => (
                  <ListItem
                    button
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedCountry(country.country)}
                  >
                    <Typography>{country.country}</Typography>
                  </ListItem>
                ))
              ) : (
                <Typography>No countries available</Typography>
              )}
            </List>
          </AccordionDetails>
        </Accordion>

        <Divider />

        {/* Additional Options Accordion */}
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{ boxShadow: "none" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Additional Options</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ maxHeight: "60px", overflowY: "auto" }}>
            <List>
              {["Option 1", "Option 2", "Option 3"].map((option, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => console.log(`${option} clicked`)}
                  sx={{ color: "green" }}
                >
                  <Typography>{option}</Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
