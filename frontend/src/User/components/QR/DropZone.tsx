import React, { useState, useCallback } from "react";
import fileExport from "@/User/assets/icons/QR/fileexport.svg";
import fileIcon from "@/User/assets/icons/QR/foldericon.svg";
import { Button } from "@/User/components/ui/button";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  onUpload: () => void;
  onCancel: () => void;
  file?: File | null;
  error?: string | null;
}

const Dropzone: React.FC<DropzoneProps> = ({
  onFileSelect,
  onUpload,
  onCancel,
  file,
  error,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    },
    [isDragging],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
        e.dataTransfer.clearData();
      }
    },
    [onFileSelect],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) onFileSelect(selectedFile);
  };

  return (
    <div className="flex max-h-[85vh] w-full flex-col justify-between px-6 py-8">
      {/* Left-aligned heading */}
      <div className="mb-6 w-full" style={{ textAlign: "left" }}>
        <h1 className="text-2xl font-bold text-[#233b75ff]">Upload QR Code</h1>
        <p className="text-muted-foreground">
          Select or drag and drop your QR code image for your ticket
          information.
        </p>
      </div>

      {/* Dotted Box */}
      <div
        className={`flex flex-grow items-center justify-center rounded-lg border-2 border-dashed ${
          isDragging ? "border-black bg-[#d9d9d9]" : "border-black bg-[#e6e6e6]"
        } h-[360px] w-full max-w-screen-xl px-4`}
        onDragOver={!file ? handleDragOver : undefined}
        onDragLeave={!file ? handleDragLeave : undefined}
        onDrop={!file ? handleDrop : undefined}
      >
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded QR"
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src={fileExport}
              alt="Upload"
              className="h-12 w-12 opacity-70"
            />
            <div className="text-3xl font-bold text-[#233b75ff]">
              Drop your QR code here
            </div>
            <div className="text-muted-foreground text-sm text-[#233b75ff]">
              or use the button below to browse
            </div>

            <div className="mt-4">
              <label
                htmlFor="qr-upload"
                className="hover:bg-primary/90 inline-flex cursor-pointer items-center gap-2 rounded-[4px] bg-[#233b75ff] px-4 py-2 text-white transition"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={fileIcon} alt="File" className="h-4 w-4" />
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
        <p className="mt-2 text-center text-sm text-red-500">{error}</p>
      )}

      {/* Supported format info */}
      <div className="text-muted-foreground mt-2 text-center text-lg">
        Supported formats: JPG, PNG (Max size: 10 MB)
      </div>

      {/* Centered buttons always visible */}
      <div className="mt-6 flex justify-center gap-20">
        <Button
          variant="outline"
          onClick={onCancel}
          className="hover:bg-muted min-w-[120px] cursor-pointer rounded-[4px] border border-black px-6 text-black transition"
        >
          Cancel
        </Button>

        <Button
          onClick={onUpload}
          className="hover:bg-primary/90 min-w-[120px] cursor-pointer rounded-[4px] bg-[#233b75ff] px-6 text-white transition hover:bg-[#1d3265]"
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Dropzone;
