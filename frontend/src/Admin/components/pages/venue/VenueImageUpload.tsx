import {
  useRef,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

interface VenueImageUploadProps {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  readonly?: boolean;
  initialUrls?: string[];
}

export default function VenueImageUpload({
  images,
  setImages,
  readonly = false,
  initialUrls = [],
}: VenueImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (readonly) return;

    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles: File[] = [];

      filesArray.forEach((file) => {
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is larger than 5MB and will not be added.`);
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        setImages((prev) => [...prev, ...validFiles]);
      }
    }
  };

  const handleRemove = (index: number) => {
    if (readonly) return;
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const openFileDialog = () => {
    if (readonly) return;
    inputRef.current?.click();
  };

  // Build all preview URLs: backend URLs first, then local object URLs
  const previews = [
    ...initialUrls,
    ...images.map((f) => URL.createObjectURL(f)),
  ];

  return (
    <div className="mt-6 w-96">
      <label className="text-xl text-[#615CB8]">
        Images <span className="text-red-400">*</span>
      </label>

      {!readonly && (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="hidden"
        />
      )}

      {previews.length === 0 ? (
        !readonly && (
          <button
            onClick={openFileDialog}
            className="mt-3 flex w-full cursor-pointer flex-row items-center justify-center gap-3 rounded-md bg-[#615CB8] py-4 text-white hover:text-gray-400"
          >
            <img src="/icons/Upload.svg" alt="Upload Icon" />
            Upload Image
          </button>
        )
      ) : (
        <div
          className={`mt-3 flex w-96 flex-wrap justify-center gap-5 rounded border border-gray-400 p-3 ${
            !readonly ? "cursor-pointer" : ""
          }`}
          onClick={openFileDialog}
        >
          {previews.map((url, index) => (
            <div
              key={index}
              className="relative border border-dashed border-gray-500 p-2"
            >
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="h-24 w-24 rounded object-cover"
              />
              {!readonly && index >= initialUrls.length && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index - initialUrls.length);
                  }}
                  className="absolute top-1 right-1 cursor-pointer rounded bg-red-500 px-1 text-xs text-white"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
