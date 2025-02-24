"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MainSidebar from "../../components/(Slider)/MainSidebar";
import VerticalIcons from "../../components/mapDetail/VerticalIcons";
import VerticalToggleButtons from "../../components/(Map)/VerticalToggleButtons";
import SearchBar from "../../components/mapDetail/SearchBar";
import countryCoordinates from "../../../../public/data/countryCoordinates";
import Map from "../../components/(Map)/Map";
import Header from "../../components/mapDetail/Header";
import "../../css/colors.css";
import { SearchProvider } from "../../useContexts/SearchContext";
import { ProductsProvider } from "../../useContexts/ProductsContext";

const IndexPage = () => {
  const [selectedSidebar, setSelectedSidebar] = useState("Legend");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [yearRange, setYearRange] = useState([2000, 2050]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [mapZoom, setMapZoom] = useState(3);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ProductsProvider>
      <Box>
        {/* Header */}
        <Grid
          container
          sx={{
            position: "relative",
            width: "100%",
            height: "55px",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <Grid container>
            <Grid size={{ xs: 12, md: 12 }}>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Header />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Search Bar */}
        <Grid
          container
          spacing={1}
          sx={{
            zIndex: 2,
            position: "relative",
            mt: 2,
          }}
        >
          <Grid size={{ xs: 12, sm: 6, md: 12 }}>
            <SearchProvider>
              <SearchBar />
            </SearchProvider>
          </Grid>
        </Grid>

        {/* Main Content */}
        <Grid
          container
          sx={{
            display: "flex",
            flex: 1,
            position: "relative",
            height: "685px",
          }}
        >
          {/* Sidebar and Icons--- */}
          <Grid
            container
            sx={{  display: "flex", flexDirection: "row" }}
          >
            {/* Vertical Icons */}
            <Box sx={{ zIndex: 10 }}>
              <VerticalIcons
                toggleSidebar={toggleSidebar}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                topCategories={topCategories}
                setTopCategories={setTopCategories}
                setCategories={setCategories}
                categories={categories}
                onSelect={() => {
                  setSelectedSidebar("Products");
                  setIsSidebarOpen(true);
                }}
              />
            </Box>

            {/* Main Sidebar */}
            {isSidebarOpen && (
              <Box
                sx={{
                  zIndex: 3,
                  width: "250px",
                  position: "relative",
                  top: "0",
                  marginLeft: "0px",
                }}
              >
                <MainSidebar
                  selected={selectedSidebar}
                  onSelect={setSelectedSidebar}
                  yearRange={yearRange}
                  setYearRange={setYearRange}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  countryCoordinates={countryCoordinates}
                  onTopCategoriesChange={setTopCategories}
                />
              </Box>
            )}
          </Grid>

          {/* Map */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              position: "absolute",
              zIndex: 1,
              top: 0,
              left: 0,
              height: "100%",
            }}
          >
            <section
              style={{
                height: "100vh",
                width: "100vw",
                position: "fixed",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              <Map
                selectedCountry={selectedCountry}
                selectedProduct={selectedProduct}
                yearRange={yearRange}
                selectedCategory={selectedCategory}
                setCategories={setCategories}
                categories={categories}
                zoom={mapZoom}
                setZoom={setMapZoom}
              />
            </section>
          </Grid>

          {/* Toggle Buttons */}
          <Grid
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 1000,
            }}
          >
            <VerticalToggleButtons mapZoom={mapZoom} setMapZoom={setMapZoom} />
          </Grid>
        </Grid>
      </Box>
    </ProductsProvider>
  );
};

export default IndexPage;
