// import { useEffect, useState, useCallback } from "react";  
// import { Box, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";  
// import CircleIcon from "@mui/icons-material/Circle";  
// import PersonIcon from "@mui/icons-material/Person";  
// import MenuIcon from '@mui/icons-material/Menu';  
// import { useProducts } from "../../useContexts/ProductsContext";  
// import { styled } from '@mui/material/styles';  

// const StyledCircleIcon = styled(CircleIcon)({  
//   '&:hover': {  
//     color: '#00796B', 
//   },  
// });  

// const VerticalIcons = ({  
//   toggleSidebar,  
//   setSelectedCategory,  
//   selectedCategory = "all",  
//   setCategories,  
//   categories,  
// }) => {  
//   const [selected, setSelected] = useState("");  
//   const { allProducts, loading, error } = useProducts();  
//   const [errorState, setErrorState] = useState("");  
//   const [topCategories, setTopCategories] = useState([]);  
//   const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer  
//   const theme = useTheme();  
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile  

//   const findTopCategories = useCallback((categories) => {  
//     const frequencyMap = {};  

//     categories.forEach((category) => {  
//       frequencyMap[category] = (frequencyMap[category] || 0) + 1;  
//     });  

//     return Object.entries(frequencyMap)  
//       .sort(([, a], [, b]) => b - a)  
//       .slice(0, 4)  
//       .map(([category]) => category);  
//   }, []);  

//   useEffect(() => {  
//     if (!loading && !error && allProducts) {  
//       try {  
//         const allCategories = Array.from(  
//           new Set(  
//             allProducts.flatMap((item) =>  
//               (item.category_name || item.classific || "Uncategorized")  
//                 .split(" / ")  
//                 .map((category) => category.trim())  
//             )  
//           )  
//         );  

//         setCategories(allCategories);  
//       } catch (err) {  
//         console.error("Error processing categories:", err);  
//         setErrorState("Error processing categories");  
//       }  
//     }  
//   }, [allProducts, loading, error, setCategories]);  

//   useEffect(() => {  
//     if (categories.length > 0) {  
//       const topCategories = findTopCategories(categories);  
//       setTopCategories(topCategories);  
//     }  
//   }, [categories, findTopCategories]);  

//   const commonIconButtonStyles = {  
//     flexDirection: "column",  
//     color: "#28b85d",  
//     width: "40px",  
//     height: "45px",  
//     zIndex: 2,  
//     padding: 1,  
//     margin: 2,  
//     "&:hover": {  
//       backgroundColor: "#E0F2F1",  
//     },  
//   };  

//   const handleCategoryClick = (label) => {  
//     setSelected(label);  
//     setSelectedCategory(label);  
//     toggleSidebar();  
//     if(isMobile) {  
//       handleDrawerToggle(); 
//     }  
//   };  

//   const handleDrawerToggle = () => {  
//     setMobileOpen(!mobileOpen);  
//   };  
//   return (  
//     <>  
//       <Box  
//         sx={{  
//           width: "60px",  
//           background: "#ffff",  
//           padding: 1,  
//           display: "flex",  
//           flexDirection: "column",  
//           position: "fixed",  
//           top: 0,  
//           left: 0,  
//           height: "100vh",  
//           gap: 2,  
//           overflowY: "hidden",  
//           alignItems: "center",  
//           justifyContent: "flex-start",  
//           paddingTop: 5,  
//         }}  
//       >  
//         <IconButton  
//           disableRipple  
//           onClick={() => {}}  
//           sx={{  
//             width: "50%",  
//             justifyItems: "center",  
//             backgroundColor: "#00897B",  
//             borderRadius: "50%",  
//             padding: "2px",  
//             "&:hover": {  
//               backgroundColor: "#4DB6AC",  
//             },  
//             marginTop: "100%",  
//           }}  
//         >  
//           <PersonIcon sx={{ fontSize: "25px", color: "#fbfffd" }} />  
//         </IconButton>  
//         <ListItem button key="All" onClick={() => handleCategoryClick("all")}>  

//         <IconButton  
//           disableRipple  
//           sx={{  
//             width: "100%",  
//             flexDirection: "column",  
//             color: "#00897B",  
//             borderRadius: "1px",  
//             padding: 0,  
//             marginTop: "10px",  
//             "&:hover": {  
//               backgroundColor: "#E0F2F1",  
//               width: "128%",  
//             },  
//           }}  
//           onClick={() => { handleCategoryClick("all");}}  
//         >  
//           <StyledCircleIcon />  
//           <Typography variant="caption" sx={{ marginTop: 0.5 }}>  
//             All  
//           </Typography>  
//         </IconButton>  
//         </ListItem>

//         {topCategories.map((item, index) => (  
//           <IconButton  
//             key={index}  
//             disableRipple  
//             sx={{  
//               width: "100%",  
//               flexDirection: "column",  
//               color: "#00897B",  
//               borderRadius: "1px",  
//               padding: 0,  
//               marginTop: "10px",  
//               "&:hover": {  
//                 backgroundColor: "#E0F2F1",  
//                 width: "128%",  
//               },  
//             }}  
//             onClick={() => { handleCategoryClick(item);}}  
//           >  
//             <StyledCircleIcon />  
//             <Typography variant="caption" sx={{ marginTop: 0.5 }}>  
//               {item}  
//             </Typography>  
//           </IconButton>  
//         ))}  

//         {errorState && <Typography color="error">{errorState}</Typography>}  
//         {error && <Typography color="error">Failed to load products</Typography>}  
//       </Box>  
//     </>  
//   );  
// };  

// export default VerticalIcons;


import { useEffect, useState, useCallback } from "react";  
import { Box, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";  
import CircleIcon from "@mui/icons-material/Circle";  
import PersonIcon from "@mui/icons-material/Person";  
import MenuIcon from '@mui/icons-material/Menu';  
import { useProducts } from "../../useContexts/ProductsContext";  
import { styled } from '@mui/material/styles';  

const StyledCircleIcon = styled(CircleIcon)({  
  '&:hover': {  
    color: '#00796B', 
  },  
});  

const VerticalIcons = ({  
  toggleSidebar,  
  setSelectedCategory,  
  selectedCategory = "all",  
  setCategories,  
  categories,  
}) => {  
  const [selected, setSelected] = useState("");  
  const { allProducts, loading, error } = useProducts();  
  const [errorState, setErrorState] = useState("");  
  const [topCategories, setTopCategories] = useState([]);  
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer  
  const theme = useTheme();  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile  

  const findTopCategories = useCallback((categories) => {  
    const frequencyMap = {};  

    categories.forEach((category) => {  
      frequencyMap[category] = (frequencyMap[category] || 0) + 1;  
    });  

    return Object.entries(frequencyMap)  
      .sort(([, a], [, b]) => b - a)  
      .slice(0, 4)  
      .map(([category]) => category);  
  }, []);  

  useEffect(() => {  
    if (!loading && !error && allProducts) {  
      try {  
        const allCategories = Array.from(  
          new Set(  
            allProducts.flatMap((item) =>  
              (item.category_name || item.classific || "Uncategorized")  
                .split(" / ")  
                .map((category) => category.trim())  
            )  
          )  
        );  

        setCategories(allCategories);  
      } catch (err) {  
        console.error("Error processing categories:", err);  
        setErrorState("Error processing categories");  
      }  
    }  
  }, [allProducts, loading, error, setCategories]);  

  useEffect(() => {  
    if (categories.length > 0) {  
      const topCategories = findTopCategories(categories);  
      setTopCategories(topCategories);  
    }  
  }, [categories, findTopCategories]);  

  const commonIconButtonStyles = {  
    flexDirection: "column",  
    color: "#28b85d",  
    width: "40px",  
    height: "45px",  
    zIndex: 2,  
    padding: 1,  
    margin: 2,  
    "&:hover": {  
      backgroundColor: "#E0F2F1",  
    },  
  };  

  const handleCategoryClick = (label) => {  
    setSelected(label);  
    setSelectedCategory(label);  
    toggleSidebar();  
    if(isMobile) {  
      handleDrawerToggle(); 
    }  
  };  

  const handleDrawerToggle = () => {  
    setMobileOpen(!mobileOpen);  
  };  

  const drawer = (  
    <Box 
      sx={{ 
        width: '80px', 
        textAlign: 'center', 
        position: 'fixed', // Fixed position to make sure it's at the top
        top: 0,  // Make sure it's at the top of the page
        left: 0,  // Position it at the left
        height: '150vh',  // Height set to cover more than the viewport
        overflow: 'hidden', 
        backgroundColor: '#fff', 
        zIndex: 1000, // Ensure it’s on top of other elements
      }} 
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>  
        <IconButton  
          sx={{  
            mt: 12,  
            backgroundColor: "#00897B",  
            borderRadius: "50%",  
            padding: "4px",  
            "&:hover": {  
              backgroundColor: "#009688",  
            },  
          }}  
        >  
          <PersonIcon sx={{ fontSize: "25px", color: "#fbfffd", alignContent: "center" }} />  
        </IconButton>  
      </Box>  
      <List>  
        <ListItem button key="All" onClick={() => handleCategoryClick("all")}>  
          <Box  
            sx={{  
              display: "flex",  
              flexDirection: "column", 
              alignItems: "center",  
              position: "relative",  
              width: "100%",  
            }}  
          >  
            <IconButton  
              disableRipple  
              sx={{  
                color: "#00897B",  
                borderRadius: "1px",  
                padding: "0",  
              }}  
            >  
              <StyledCircleIcon />  
            </IconButton>  
            <Typography variant="caption" sx={{ marginTop: 0.5, color: "#00897B" }}>  
              All  
            </Typography>  
            <Box  
              className="hoverEffect"  
              sx={{  
                position: "absolute",  
                top: "50%",  
                left: "50%",  
                transform: "translate(-50%, -50%)",  
                transition: "width 0.3s, height 0.3s",  
                width: 0,  
                height: 0, 
                "&:hover": {  
                  width: "200px",  
                  height: "100%",  
                },  
              }}  
            />  
          </Box>  
        </ListItem>  
        {topCategories.map((category) => (  
          <ListItem button key={category} onClick={() => handleCategoryClick(category)}>  
            <Box  
              sx={{  
                display: "flex",  
                flexDirection: "column",  
                alignItems: "center",  
                position: "relative",  
                width: "100%",  
              }}  
            >  
              <IconButton  
                disableRipple  
                sx={{  
                  color: "#00897B",  
                  borderRadius: "1px",  
                  padding: "0",  
                }}  
              >  
                <StyledCircleIcon />  
              </IconButton>  
              <Typography variant="caption" sx={{ marginTop: 0.5, color: "#00897B" }}>  
                {category}  
              </Typography>  
              <Box  
                className="hoverEffect"  
                sx={{  
                  position: "absolute",  
                  top: "50%",  
                  left: "50%",  
                  transform: "translate(-50%, -50%)",  
                  transition: "width 0.3s, height 0.3s",  
                  width: 0,  
                  height: 0,  
                  "&:hover": {  
                    width: "80px",  
                    height: "100%",  
                  },  
                }}  
              />  
            </Box>  
          </ListItem>  
        ))}  
      </List>  
    </Box>  
  );

  return (  
    <>  
      {isMobile ? (  
        <>  
          <IconButton  
            color="inherit"  
            aria-label="open drawer"  
            edge="start"  
            onClick={handleDrawerToggle}  
            sx={{ ml: 2, display: { sm: 'none', color: '#00897B' },marginTop:"-110px" }}  
          >  
            <MenuIcon />  
          </IconButton>  
          <Drawer  
            anchor="left"  
            open={mobileOpen}  
            onClose={handleDrawerToggle}  
            ModalProps={{  
              keepMounted: true,   
            }}  
            sx={{  
              display: { xs: 'block', sm: 'none' },  
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: "20%", 
                height: '100vh',  // Ensure full height for mobile drawer
              },  
            }}  
          >  
            {drawer}  
          </Drawer>  
        </>  
      ) : (  
        <Box  
          sx={{  
            width: "40%",  
            background: "#ffff",  
            padding: 2,  
            display: "flex",  
            flexDirection: "column",  
            gap: 1,  
            height: "100vh", // Full viewport height for desktop
          }}  
        >  
          <Box sx={{ textAlign: "center" }}>  
            <IconButton  
              sx={{  
                backgroundColor: "#00897B",  
                borderRadius: "50%",  
                padding: "4px",  
                "&:hover": {  
                  backgroundColor: "#009688",  
                },  
              }}  
            >  
              <PersonIcon sx={{ fontSize: "25px", color: "#fbfffd" }} />  
            </IconButton>  
          </Box>  
          {drawer}  
        </Box>  
      )}  
    </>  
  );  
};  

export default VerticalIcons;  
