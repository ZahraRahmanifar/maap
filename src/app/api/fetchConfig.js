// api/fetchConfig.js
const BASE_URL = "https://epd-fullstack-project.vercel.app/api";
export const fetcher = async (endpoint, options = {}) => {
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers, // هدرهای اضافه
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};
