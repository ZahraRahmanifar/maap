import React from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";

const FilteredInfoSection = ({
  extraInfo = [],
  showLastProduct,
  handleRemoveInfo,
  handleRemoveLastProduct,
}) => {
  return (
    <Paper
      sx={{
        padding: 2,
        bgcolor: "#fbfbfb",
        mt: 2,
        width: "118%",
        marginLeft: { xs: "-1%", md: "6%" },
      }}
    >
      {/* نمایش اطلاعات اضافی */}
      {extraInfo.length > 0 ? (
        extraInfo.map((info, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              borderBottom: "1px solid #e0e0e0",
              pb: 1,
              position: "relative",
            }}
          >
            <Typography variant="body2">
              <span
                style={{
                  fontSize: "20px",
                  color: "#37392e",
                  marginRight: "4px",
                }}
              >
                •
              </span>
              {info}
            </Typography>

            {/* دایره سبز پشت ضربدر */}
            <IconButton
              onClick={() => handleRemoveInfo(index)}
              size="small"
              sx={{
                ml: "auto",
                height: "20px",
                color: "#fff",
                backgroundColor: "#3b4230",
                borderRadius: "50%",
                padding: "1px",
                mt: "4px",
                "&:hover": {
                  backgroundColor: "#00897B",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))
      ) : (
        <Typography
          variant="body2"
          sx={{ color: "#888", textAlign: "center", display: "block" }}
        >
          No additional information available.
        </Typography>
      )}

      {/* نمایش آخرین محصول */}
      {showLastProduct && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Box
            sx={{
              width: "48px",
              height: "48px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <ImageIcon sx={{ color: "#656959", fontSize: "32px" }} />
          </Box>
          <Box paddingLeft={"10px"}>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Product 05
            </Typography>
            <Typography variant="caption" sx={{ color: "#999" }}>
              Lorem ipsum dolor sit amet
            </Typography>
          </Box>

          <IconButton
            size="small"
            sx={{
              ml: "auto",
              color: "#fff",
              backgroundColor: "#3b4230",
              borderRadius: "50%",
              padding: "2px",
              "&:hover": {
                backgroundColor: "#00897B",
              },
            }}
            onClick={handleRemoveLastProduct}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default FilteredInfoSection;



