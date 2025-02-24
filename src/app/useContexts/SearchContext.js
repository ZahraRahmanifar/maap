// contexts/SearchContext.js
import React, { createContext, useState, useContext, useMemo } from "react";
import { useProducts } from "./ProductsContext"; // استفاده از ProductsContext برای دریافت داده‌ها

// ایجاد context برای جستجو
const SearchContext = createContext();

// تابع برای استفاده از context در کامپوننت‌ها
export const useSearch = () => useContext(SearchContext);

// کامپوننت فراهم‌کننده context
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // دریافت محصولات از ProductsContext
  const { allProducts } = useProducts();

  // فیلتر کردن محصولات بر اساس query جستجو
  useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allProducts.filter((product) => {
      return (
        product.owner?.toLowerCase().includes(lowercasedQuery) ||
        product.name?.toLowerCase().includes(lowercasedQuery) ||
        product.product_name?.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, filteredProducts }}
    >
      {children}
    </SearchContext.Provider>
  );
};
