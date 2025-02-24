import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Modal,
  List,
  ListItem,
  Typography,
  Fab,
  ListItemText,
  IconButton,
  ListItemIcon,
  Tooltip,
  Pagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import ListIcon from "@mui/icons-material/List";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useSearch } from "../../useContexts/SearchContext";
import { useProducts } from "../../useContexts/ProductsContext";

const SearchBar = () => {
  const [icon, setIcon] = useState(<PublicIcon sx={{ color: "#384029" }} />);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { allProducts } = useProducts();
  const { filteredProducts, setSearchQuery: setContextSearchQuery } = useSearch();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setContextSearchQuery(query);
  };

  const handleIconClick = () => {
    if (icon.type === PublicIcon) {
      setIcon(<ListIcon sx={{ color: "#384029" }} />);
      setOpenModal(true);
    } else {
      setIcon(<PublicIcon sx={{ color: "#384029" }} />);
      setOpenModal(false);
    }
  };

  const handleDownload = (pdf_url) => {
    if (pdf_url) {
      const link = document.createElement("a");
      link.href = pdf_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = pdf_url.split("/").pop();
      link.click();
    }
  };

  // Group products by country
  const groupedByCountry = filteredProducts.reduce((acc, product) => {
    const country = product.country || "Unknown";
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(product);
    return acc;
  }, {});

  const countryNames = Object.keys(groupedByCountry);
  const productsForCurrentPage = groupedByCountry[countryNames[page - 1]] || [];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        width: "100%",
        position: "fixed",
        top: isMobile ? 0 : 100,
        zIndex: 1000,
        backgroundColor: isMobile ? "white" : "transparent",
      }}
    >
      <Grid container display={"flex"} justifyContent="center" sx={{ width: isMobile ? "90%" : "50%" }}>
        <Grid item xs={isMobile ? 8 : 9} sx={{ marginRight: isMobile ? 0 : "8px" }}>
          <TextField
            placeholder="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              borderRadius: "25px",
              "& .MuiOutlinedInput-root": {
                height: "40px",
                borderRadius: "25px",
                background: "#fbfbfb",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "#384029" }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={isMobile ? 4 : 2} sx={{ display: "flex", alignItems: "center" }}>
          <Fab
            size="small"
            aria-label="Icon"
            sx={{ background: "white" }}
            onClick={handleIconClick}
          >
            {icon}
          </Fab>
        </Grid>
      </Grid>

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setIcon(<PublicIcon sx={{ color: "#384029" }} />);
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "900px",
            height: "600px",
            bgcolor: "white",
            padding: 2,
            marginTop: 10,
            borderRadius: 2,
            boxShadow: 3,
            overflowY: "auto",
          }}
        >
          {/* <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Products from {countryNames[page - 1]}
          </Typography> */}
          <List>
            {productsForCurrentPage.map((product, index) => (
              <ListItem
                key={`Product${index}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  height: "65px",
                  paddingX: 2,
                  paddingY: 5,
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px", marginRight: 4 }}>
                  <Box
                    component="img"
                    src={product.image_url || "/public/images/images(map).png"}
                    alt={`Product ${index + 1}`}
                    sx={{
                      width: 30,
                      height: 30,
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </ListItemIcon>
                <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <ListItemText
                    primary={product.name || product.product_name}
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "12px",
                          color: "#999",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.description?.length > 100
                          ? `${product.description.slice(0, 100)}...`
                          : product.description || ""}
                      </Typography>
                    }
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginLeft: 2,
                    }}
                  >
                    <Box
                      sx={{
                        height: "18px",
                        width: "55px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#B2DFDB",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        marginBottom: 1,
                      }}
                    >
                      <StarIcon sx={{ color: "#00897B", fontSize: "18px" }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      {product.type === "EPD" && product.pdf_url ? (
                        <Tooltip title="Download PDF">
                          <IconButton
                            onClick={() => handleDownload(product.pdf_url)}
                          >
                            <DownloadIcon sx={{ color: "#00897B" }} />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Request Info">
                          <IconButton onClick={() => alert("Request sent!")}>
                            <SendIcon
                              style={{ color: "#00897B", fontSize: "24px" }}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      <IconButton>
                        <InfoOutlinedIcon sx={{ color: "#fbfffd" }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
          <Pagination
            count={countryNames.length}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default SearchBar;
