"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; // Material UI Button component
import React, { useState } from "react";
import Image from "next/image";
import "../../css/colors.css";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle image preview when a file is selected
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
      setFile(selectedFile);
    }
  };

  // Trigger file input when the image box is clicked
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  // Handle file submission to the backend API
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const response = await fetch("http://localhost:8000/api/upload-image/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
        alert("Image uploaded successfully");
      } else {
        console.error("Error uploading image");
        alert("Error uploading image");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Box
        width={"90%"}
        height={"200px"}
        backgroundColor={"var(--upload_bg)"}
        border={"2px dashed var(--second_color)"}
        borderRadius={"20px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={handleImageClick}
        sx={{ cursor: "pointer" }}
      >
        {/* Display the selected image or a placeholder image */}
        <Image
          src={selectedImage || "/assets/images/upload.png"}
          alt="upload"
          width={100}
          height={100}
        />
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Hidden file input to handle image selection */}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Material UI Button for submission */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={uploading}
          sx={{
            marginTop: "20px",
            backgroundColor: uploading ? "grey" : "var(--second_color)",
            "&:hover": {
              backgroundColor: "var(--second_color)",
            },
            fontWeight: "bold",
            fontSize: "14px",
            padding: "5px 20px",
          }}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </form>
    </>
  );
};

export default UploadImage;
