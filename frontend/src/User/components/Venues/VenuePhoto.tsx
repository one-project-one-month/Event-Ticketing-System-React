// VenuePhoto.tsx
import { useState, useEffect } from "react";
import CArrowRight from "../icons/CArrowRight";
import SampleVenue from "@/User/assets/sample-venue-1.png";

interface VenuePhotoProps {
  imagePaths: string[];
}

export default function VenuePhoto({ imagePaths }: VenuePhotoProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!imagePaths || imagePaths.length === 0) {
      setImages([SampleVenue]);
    } else {
      setImages(imagePaths);
    }
  }, [imagePaths]);

  const handleImageError = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? SampleVenue : img))
    );
  };

  const rightClickHandler = () => {
    setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const leftClickHandler = () => {
    setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div>
      <div className="flex h-[35rem] w-full flex-row overflow-hidden rounded-lg">
        <img
          src={images[imgIndex]}
          alt="Venue Photo"
          onError={() => handleImageError(imgIndex)}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-4 flex flex-row items-center justify-center gap-2">
        <CArrowRight
          className="[&>*]transition-colors [&>*]duration-300 size-8 rotate-180"
          hoverColor="hover:fill-[#6f6c8f]"
          onClick={leftClickHandler}
        />
        <p>
          {imgIndex + 1} / {images.length}
        </p>
        <CArrowRight
          className="[&>*]transition-colors [&>*]duration-300 size-8"
          hoverColor="hover:fill-[#6f6c8f]"
          onClick={rightClickHandler}
        />
      </div>
    </div>
  );
}
