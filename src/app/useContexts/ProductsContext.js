"use client";
// contexts/ProductsContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import {
  fetchEpdProducts,
  fetchIbuProducts,
} from "../api/allProductWithEpd/product";

// create context for products
const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const epdProducts = await fetchEpdProducts();
        const ibuProducts = await fetchIbuProducts();

        // Combine valid product arrays
        const combinedProducts = [...epdProducts, ...ibuProducts];
        setAllProducts(combinedProducts);
      } catch (error) {
        console.error("Error fetching product data", error);
        setError("Failed to fetch product data.");
        setAllProducts([]); // Reset products on error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log("🚀 ~ ProductsProvider ~ allProducts:", allProducts);

  return (
    <ProductsContext.Provider value={{ allProducts, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
