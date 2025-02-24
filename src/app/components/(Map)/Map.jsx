"use client";

import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import countryCoordinates from "../../../../public/data/countryCoordinates";
import { useProducts } from "../../useContexts/ProductsContext";

const Map = ({
  selectedCountry = "all",
  yearRange,
  selectedProduct = "all",
  selectedCategory,
  zoom,
  setZoom,
}) => {
  // console.log("🚀 ~ zoom:", zoom);
  const [locations, setLocations] = useState([]);
  // const [zoom, setZoom] = useState(3);
  const { allProducts, loading, error } = useProducts();
  // console.log("🚀 ~ allProducts:", allProducts);

  useEffect(() => {
    if (!loading && !error) {
      const formattedLocations = allProducts
        .map((item) => {
          const countryData = countryCoordinates[item.geo];
          if (!countryData) return null;

          return {
            lat: countryData.lat,
            lng: countryData.lng,
            country: countryData.country,
            refYear: item.ref_year || "all",
            validUntil: item.valid_until || "all",
            product: item.name || item.product_name || "No product specified",
            isEpd: item.type,
            categories: item.classific || item.category_name,
          };
        })
        .filter((location) => location !== null);

      setLocations(formattedLocations);
    }
  }, [allProducts, loading]);

  const ZoomControl = ({ setZoom, zoom }) => {
    const map = useMap();

    useEffect(() => {
      map.setView(map.getCenter(), zoom);
    }, [zoom, map]);

    useEffect(() => {
      const updateZoom = () => {
        setZoom(map.getZoom());
      };

      map.on("zoomend", updateZoom);
      return () => {
        map.off("zoomend", updateZoom);
      };
    }, [map, setZoom]);

    return null;
  };
  // const ZoomControl = ({ setZoom }) => {
  //   const map = useMap();
  //   useEffect(() => {
  //     const updateZoom = () => {
  //       setZoom(map.getZoom());
  //     };

  //     map.on("zoomend", updateZoom);
  //     return () => {
  //       map.off("zoomend", updateZoom);
  //     };
  //   }, [map, setZoom]);

  //   return null;
  // };

  const groupByCountry = (locations) => {
    return locations.reduce((acc, location) => {
      if (!acc[location.country]) {
        acc[location.country] = [];
      }
      acc[location.country].push(location);
      return acc;
    }, {});
  };

  const distributeCircles = (lat, lng, count, zoom) => {
    var maxRadius = 2;
    if (zoom > 5) {
      maxRadius = 2;
    } else {
      maxRadius = 2;
    }
    const angleStep = (2 * Math.PI) / count; //angular distance

    return Array.from({ length: count }, (_, i) => {
      const angle = i * angleStep;
      const distance = Math.random() * maxRadius;

      const latOffset = distance * Math.cos(angle);
      const lngOffset = distance * Math.sin(angle);

      return {
        lat: lat + latOffset,
        lng: lng + lngOffset,
      };
    });
  };

  const getDistributedLocations = (locations, zoom) => {
    const groupedLocations = groupByCountry(locations);

    return Object.values(groupedLocations).flatMap((group) => {
      return group.map((item, index) => {
        const centralLocation = group[0];
        const distributedCoords = distributeCircles(
          centralLocation.lat,
          centralLocation.lng,
          group.length,
          zoom
        );

        return {
          ...item,
          lat: distributedCoords[index].lat,
          lng: distributedCoords[index].lng,
        };
      });
    });
  };

  const getFilteredLocations = () => {
    return locations.filter((location) => {
      const countryMatch =
        selectedCountry === "all" ||
        !selectedCountry ||
        location.country === selectedCountry;

      const yearMatch =
        yearRange[0] === "all" ||
        yearRange[1] === "all" ||
        ((location.refYear === "all" || location.refYear >= yearRange[0]) &&
          (location.validUntil === "all" ||
            location.validUntil <= yearRange[1]));

      // console.log(yearMatch);

      const productMatch =
        selectedProduct === "all" ||
        !selectedProduct ||
        location.product === selectedProduct;

      const categoryMatch =
        selectedCategory === "all" ||
        location.categories.length === 0 ||
        location.categories.includes(selectedCategory);

      return countryMatch && yearMatch && productMatch && categoryMatch;
    });
  };

  const filteredLocations = getFilteredLocations();
  const distributedLocations = useMemo(
    () => getDistributedLocations(filteredLocations, zoom),
    [filteredLocations, zoom]
  );

  const getCircleRadius = (zoom) => {
    let radius;
    if (zoom > 3 && zoom <= 5) {
      radius = 600000 / (zoom * 4);
    } else if (zoom > 5 && zoom <= 10) {
      radius = 600000 / (zoom * 20);
    } else if (zoom > 10 && zoom <= 15) {
      radius = 5000 / zoom;
    } else if (zoom > 15) {
      radius = 100;
    } else {
      radius = 150000;
    }
    return radius;
  };

  return (
    <>
      <MapContainer
        center={[30, -10]}
        zoom={zoom}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <ZoomControl setZoom={setZoom} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        {distributedLocations.map((location, index) => (
          <Circle
            key={index}
            center={[location.lat, location.lng]}
            radius={getCircleRadius(zoom)}
            fillColor={location.isEpd ? "#00897B" : "#80CBC4"}
            fillOpacity={0.5}
            stroke={false}
          >
            <Popup>
              <strong>{location.country}</strong>
              <br />
              <br />
              Product: {location.product}
              {location.isEpd && (
                <>
                  <br />
                  {location.isEpd}
                </>
              )}
              {/* <br />
              {location.isEpd ? (
                <>
                  <br />
                  EPD: available
                </>
              ) : (
                <>
                  <br />
                  EPD: not available
                </>
              )} */}
              <br />
              {/* <br />
              Valid Until: {location.validUntil} */}
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
