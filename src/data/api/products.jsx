import { useEffect } from "react";

function Products() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch("https://epd-fullstack-project.vercel.app/api/ibudata/"),
          // fetch("https://epd-fullstack-project.vercel.app/api/oekobaudat/"),
          fetch("https://epd-fullstack-project.vercel.app/api/products/"),
        ]);

        if (!response1.ok || !response2.ok) {
          //|| !response3.ok
          throw new Error(
            `HTTP error! statuses: ${response1.status}, ${response2.status} ` //, ${response3.status}
          );
        }

        const data1 = await response1.json();
        const data2 = await response2.json();
        // const data3 = await response3.json();

        const combinedResults = [
          ...(data1.results || []),
          ...(data2.results || []),
          // ...(data3.results || []),
        ];

        const formattedLocations = combinedResults
          .map((item) => {
            // console.log("🚀 ~ .map ~ item:", item);
            const countryData = countryCoordinates[item.geo];
            // console.log("🚀 ~ .map ~ countryData:", countryData);
            if (!countryData) {
              console.error(`No coordinates found for geo: ${item.geo}`);
              return null;
            }

            const isEpd = item.type === "EPD";
            console.log("🚀 ~ .map ~ isEpd:", isEpd);
            return {
              lat: countryData.lat,
              lng: countryData.lng,
              country: countryData.country,
              refYear: item.ref_year || 2000,
              validUntil: item.valid_until || 2050,
              product: item.name || item.product_name || "No product specified",
              isEpd,
            };
          })
          .filter((location) => location !== null);

        setLocations(formattedLocations);
      } catch (error) {
        console.error("Error fetching data Locations:", error);
        setError("Error fetching data Locations");
      }
    };

    fetchLocations();
  }, []);
  return;
}

export default Products;
