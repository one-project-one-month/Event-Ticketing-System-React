import React, { useState, useCallback } from "react";
import fileExport from "@/assets/icons/QR/fileexport.svg";
import fileIcon from "@/assets/icons/QR/foldericon.svg";
import { Button } from "@/components/ui/button";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  onUpload: () => void;
  onCancel: () => void;
  file?: File | null; 
  error?: string | null; 
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect, onUpload, onCancel, file, error }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
      e.dataTransfer.clearData();
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) onFileSelect(selectedFile);
  };

  return (
    <div className="w-full min-h-[85vh] flex flex-col justify-between px-6 py-8">
      {/* Left-aligned heading */}
      <div className="mb-6 w-full" style={{ textAlign: "left" }}>
        <h1 className="text-2xl font-bold text-[#233b75ff]">Upload QR Code</h1>
        <p className="text-muted-foreground">
          Select or drag and drop your QR code image for your ticket information.
        </p>
      </div>

      {/* Dotted Box */}
      <div
        className={`flex-grow flex items-center justify-center
          border-2 border-dashed rounded-lg
          ${
            isDragging
              ? "border-black bg-[#d9d9d9]"
              : "border-black bg-[#e6e6e6]"
          }
          w-full max-w-screen-xl h-[360px] px-4
        `}
        onDragOver={!file ? handleDragOver : undefined}
        onDragLeave={!file ? handleDragLeave : undefined}
        onDrop={!file ? handleDrop : undefined}
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded QR"
            className="max-h-full max-w-full object-contain rounded-lg"/>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <img src={fileExport} alt="Upload" className="w-12 h-12 opacity-70" />
            <div className="text-3xl font-bold text-[#233b75ff]">
              Drop your QR code here
            </div>
            <div className="text-sm text-muted-foreground text-[#233b75ff]">
              or use the button below to browse
            </div>

            <div className="mt-4">
              <label
                htmlFor="qr-upload"
                className="inline-flex items-center gap-2 bg-[#233b75ff] text-white px-4 py-2 rounded-[4px] hover:bg-primary/90 transition cursor-pointer"
                onClick={e => e.stopPropagation()}
              >
                <img src={fileIcon} alt="File" className="w-4 h-4" />
                <span>Browse Files</span>
              </label>
              <input
                id="qr-upload"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">
          {error}
        </p>
      )}

      {/* Supported format info */}
      <div className="text-center text-lg text-muted-foreground mt-2">
        Supported formats: JPG, PNG (Max size: 10 MB)
      </div>

      {/* Centered buttons always visible */}
      <div className="flex justify-center gap-20 mt-6">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border border-black text-black rounded-[4px] px-6 min-w-[120px] hover:bg-muted transition cursor-pointer"
        >
          Cancel
        </Button>

        <Button
          onClick={onUpload}
          className="bg-[#233b75ff] hover:bg-[#1d3265] text-white rounded-[4px] px-6 min-w-[120px] hover:bg-primary/90 transition cursor-pointer"
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Dropzone;




