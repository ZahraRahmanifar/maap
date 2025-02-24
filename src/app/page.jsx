"use client";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MainSidebar from "./components/(Slider)/MainSidebar";
import VerticalIcons from "./components/mapDetail/VerticalIcons";
import VerticalToggleButtons from "./components/(Map)/VerticalToggleButtons";
import SearchBar from "./components/mapDetail/SearchBar";
import countryCoordinates from "../../public/data/countryCoordinates";
import Map from "./components/(Map)/Map";
import Header from "./components/mapDetail/Header";

const IndexPage = () => {
  const [selectedSidebar, setSelectedSidebar] = useState("Legend");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [yearRange, setYearRange] = useState([2000, 2050]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  console.log("🚀 ~ IndexPage ~ topCategories:", topCategories);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setProductName(data.name);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box>
      {/* Search Bar */}
      <Grid container spacing={2} sx={{ zIndex: 2, position: "relative" }}>
        <Grid size={{ xs: 12 }}>
          <Header />

          <SearchBar />
        </Grid>
      </Grid>

      <Grid
        container
        sx={{ display: "flex", flex: 1, position: "relative", height: "685px" }}
      >
        {/* Vertical Icons and Sidebar */}
        <Grid sx={{ zIndex: 2, display: "flex", flexDirection: "row" }}>
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
          {/* Main Sidebar */}
          {isSidebarOpen && (
            <Box sx={{ zIndex: 3 }}>
              <MainSidebar
                selected={selectedSidebar}
                onSelect={setSelectedSidebar}
                yearRange={yearRange}
                setYearRange={setYearRange}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct} // ارسال setSelectedProduct برای به‌روزرسانی محصول انتخابی
                countryCoordinates={countryCoordinates}
                productName={productName}
                onTopCategoriesChange={setTopCategories}
              />
            </Box>
          )}
        </Grid>

        {/* نقشه */}
        <Grid
          size={{ xs: 12 }}
          sx={{
            position: "absolute",
            zIndex: +1,
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
            />
          </section>
        </Grid>

        {/* دکمه‌های عمودی در گوشه پایین راست */}
        <Grid
          sx={{
            position: "fixed",
            bottom: "20px", // پایین صفحه
            right: "20px", // سمت راست صفحه
            zIndex: 1000, // اطمینان از اینکه بالای سایر کامپوننت‌ها قرار بگیرد
          }}
        >
          <VerticalToggleButtons mapRef={null} />{" "}
          {/* ارسال mapRef به کامپوننت VerticalToggleButtons */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndexPage;
