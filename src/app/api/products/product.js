// api/products/product.js
import { fetcher } from "../fetchConfig";

export const getProducts = async () => {
  let allProducts = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const response = await fetch(`https://epd-fullstack-project.vercel.app/api/products/?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data from EPD API");
      }
      const data = await response.json();
      allProducts = [...allProducts, ...data.results];
      hasNextPage = data.next ? true : false;
      page += 1;
    } catch (error) {
      console.error("Error fetching EPD products:", error);
      hasNextPage = false;
    }
  }

  return allProducts;
};
