"use client";
import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";
import Image from "next/image";

const UploadExel = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [downloadUrl, setDownloadUrl] = useState(); // For handling download URL
  const [isClient, setIsClient] = useState(false); // Check if on client-side

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFiles = (event) => {
    if (!isClient) return;

    const files = event.target.files;
    const newFiles = Array.from(files).map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
    }));

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    newFiles.forEach((fileObj) => {
      simulateUpload(fileObj.id);
    });
  };

  const simulateUpload = (id) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [id]: progress,
      }));
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  const handleDelete = (id) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    setUploadProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      delete newProgress[id];
      return newProgress;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFiles.length === 0) {
      alert("Please upload a file first");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((fileObj) => {
      formData.append("file", fileObj.file);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload-excel/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // If the server returns the Excel file directly as a binary response
        const blob = await response.blob(); // Retrieve the binary content (Excel file)
        const downloadUrl = URL.createObjectURL(blob); // Create a temporary URL
        setDownloadUrl(downloadUrl); // Store the URL for downloading
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) {
      alert("No file available for download");
      return;
    }

    const link = document.createElement("a");
    link.href = downloadUrl; // Directly use the blob URL we generated
    link.setAttribute("download", "Processed_Result.xlsx"); // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optionally revoke the URL to free up memory
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <>
      {selectedFiles.map((fileObj) => (
        <Box
          key={fileObj.id}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="90%"
          padding="10px"
          marginBottom="15px"
          borderRadius="10px"
          border="2px solid var(--second_color)"
        >
          <InsertDriveFileIcon
            htmlColor="var(--second_color)"
            style={{ fontSize: 30 }}
          />
          <Typography>{fileObj.file.name}</Typography>
          <Button onClick={() => handleDelete(fileObj.id)}>
            <DeleteIcon htmlColor="black" />
          </Button>
        </Box>
      ))}

      <Box
        width="90%"
        height="200px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        border="2px dashed var(--second_color)"
        borderRadius="20px"
        backgroundColor="var(--upload_bg)"
        onClick={() => document.getElementById("inputExel").click()}
        sx={{ cursor: "pointer" }}
      >
        <Image
          src="/assets/images/uploadExel.png"
          alt="upload"
          width={50}
          height={50}
        />
        <Typography fontSize="10px">
          Drag & Drop or <Link href="#">Browse</Link>
        </Typography>
      </Box>

      {selectedFiles.length > 0 &&
        selectedFiles.map(
          (fileObj) =>
            uploadProgress[fileObj.id] < 100 && (
              <Box
                key={fileObj.id}
                display="flex"
                alignItems="center"
                marginTop="10px"
                width="100%"
              >
                <Typography fontSize="12px" color="textSecondary" width="40px">
                  {uploadProgress[fileObj.id] || 0}%
                </Typography>
                <Box width="100%" marginRight="10px">
                  <LinearProgress
                    color="success"
                    variant="determinate"
                    value={uploadProgress[fileObj.id] || 0}
                  />
                </Box>
                <Button onClick={() => handleDelete(fileObj.id)}>
                  <CloseIcon htmlColor="black" fontSize="5px" />
                </Button>
              </Box>
            ),
        )}

      <form onSubmit={handleSubmit}>
        <input
          id="inputExel"
          type="file"
          style={{ display: "none" }}
          accept=".xlsx, .xls"
          onChange={handleFiles}
          multiple
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            marginTop: "20px",
            backgroundColor: "var(--second_color)",
            width: "100%",
            height: "30px",
          }}
        >
          Upload
        </Button>
      </form>

      {downloadUrl && (
        <Button
          onClick={handleDownload}
          variant="contained"
          color="primary"
          style={{
            marginTop: "20px",
            backgroundColor: "var(--second_color)",
            width: "100%",
            height: "30px",
          }}
        >
          Download Processed File
        </Button>
      )}
    </>
  );
};

export default UploadExel;
