"use client";
import React, { useState } from 'react';

const UploadExcel = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload-excel/', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.blob();
        const downloadUrl = URL.createObjectURL(result);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'processed_file.xlsx';
        link.click();
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button type="submit">Upload Excel</button>
    </form>
  );
};

export default UploadExcel;

