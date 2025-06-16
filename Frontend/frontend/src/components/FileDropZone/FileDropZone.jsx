import React, { useState } from "react";
import "./FileDropZone.css";

function FileDropZone() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));
    try {
      const response = await fetch("http://localhost:8000/api/upload_file/", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("File(s) uploaded successfully!");
        setFiles([]);
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      alert("Error uploading file.");
    }
    setUploading(false);
  };

  return (
    <section
      className="file-dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-label="File upload dropzone"
    >
      <header className="file-dropzone__header">
        <p>Drag and drop files here, or</p>
        <label htmlFor="fileInput" className="file-dropzone__label" tabIndex={0}>
          select files manually
        </label>
        <input
          type="file"
          multiple
          id="fileInput"
          className="file-dropzone__input"
          onChange={handleFileChange}
        />
      </header>

      {files.length > 0 && (
        <aside className="file-dropzone__file-list" aria-live="polite">
          <h2>Selected files:</h2>
          <ul>
            {files.map((file, idx) => (
              <li key={idx}>
                {file.name} — {(file.size / 1024).toFixed(2)} KB
              </li>
            ))}
          </ul>
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </aside>
      )}
    </section>
  );
}

export default FileDropZone;

