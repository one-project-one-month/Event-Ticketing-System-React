import { useRef, useState } from "react";

export default function VenueImageUpload() {
  const [images, setImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mt-6 w-96">
      <label className="text-xl text-[#615CB8]">
        Images <span className="text-red-400">*</span>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageSelect}
        className="hidden"
      />

      {images.length === 0 ? (
        <button
          onClick={openFileDialog}
          className="mt-3 flex w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-md bg-[#615CB8] py-4 text-white hover:text-gray-400"
        >
          <img src="/icons/Upload.svg" alt="Upload Icon" />
          Upload Image
        </button>
      ) : (
        <div
          className="mt-3 flex w-96 cursor-pointer flex-wrap justify-center gap-5 rounded border border-gray-400 p-3"
          onClick={openFileDialog}
        >
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(img)}
                alt={`Image ${index + 1}`}
                className="h-24 w-24 rounded object-cover"
              />
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-1 right-1 cursor-pointer rounded bg-red-500 px-1 text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
