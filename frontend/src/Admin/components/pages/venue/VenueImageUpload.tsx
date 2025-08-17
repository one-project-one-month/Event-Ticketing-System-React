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
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const isReplacingAll = images.length > 0;

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (readonly) return;
    if (!e.target.files) return;

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
  };

  const handleRemoveNew = (index: number) => {
    if (readonly) return;
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExisting = () => {
    if (readonly || isReplacingAll) return;
  };

  const clearNewUploads = () => {
    setImages([]);
  };

  const openFileDialog = () => {
    if (readonly) return;
    inputRef.current?.click();
  };

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

      {/* Existing images */}
      <div className="mt-3 rounded border border-gray-300 p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">Existing Images</p>
          {!readonly && isReplacingAll && (
            <span className="text-xs text-gray-500">
              These will be <b>replaced</b> when you save.
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {initialUrls.length === 0 ? (
            <p className="text-sm text-gray-500">No existing images.</p>
          ) : (
            initialUrls.map((url, idx) => (
              <div
                key={`exist-${idx}`}
                className={`relative border border-dashed border-gray-500 p-2 ${
                  isReplacingAll ? "opacity-50" : ""
                }`}
                title={isReplacingAll ? "Will be replaced on save" : ""}
              >
                <img
                  src={`${baseUrl}/${url}`}
                  alt={`Existing ${idx + 1}`}
                  className="h-24 w-24 rounded object-cover"
                />
                {!readonly && !isReplacingAll && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExisting();
                    }}
                    className="absolute top-1 right-1 cursor-pointer rounded bg-red-500 px-1 text-xs text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* New images (replacement) */}
      <div className="mt-3 rounded border border-gray-300 p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">New Uploads</p>
          {!readonly && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={openFileDialog}
                className="rounded bg-[#615CB8] px-3 py-1 text-sm text-white hover:opacity-90"
              >
                Upload Image(s)
              </button>
              {isReplacingAll && (
                <button
                  type="button"
                  onClick={clearNewUploads}
                  className="rounded border px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>

        {images.length === 0 ? (
          <p className="text-sm text-gray-500">
            {readonly
              ? "No new uploads."
              : "You can upload images here. If you upload any, all existing images will be replaced when you save."}
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {images.map((file, index) => (
              <div
                key={`new-${index}`}
                className="relative border border-dashed border-gray-500 p-2"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`New ${index + 1}`}
                  className="h-24 w-24 rounded object-cover"
                />
                {!readonly && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveNew(index);
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

      {/* Warnings */}
      {!readonly && (
        <div className="mt-2 space-y-1 text-xs text-gray-500">
          <p>• Max file size 5MB per image.</p>
          {isReplacingAll ? (
            <p>
              • You added new image(s):{" "}
              <b>all existing images will be replaced</b> after saving.
            </p>
          ) : (
            <p>• Removing an existing image deletes it after saving.</p>
          )}
        </div>
      )}
    </div>
  );
}
