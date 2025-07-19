import SampleVenue from "@/User/assets/sample-venue-1.png";
import { useState } from "react";
import CArrowRight from "../icons/CArrowRight";

export default function VenuePhoto() {
  const imagePaths = [
    SampleVenue,
    "https://www.tiogagardens.com/media/1207/llgrounds.jpg",
  ];
  const [imgIndex, setImgIndex] = useState(0);

  const rightClickHandler = () => {
    if (imgIndex == imagePaths.length - 1) {
      setImgIndex(0);
    } else {
      setImgIndex(imgIndex + 1);
    }
  };

  const leftClickHandler = () => {
    if (imgIndex == 0) {
      setImgIndex(imagePaths.length - 1);
    } else {
      setImgIndex(imgIndex - 1);
    }
  };

  return (
    <div>
      {/* Image */}
      <div className="flex h-[35rem] w-full flex-row overflow-hidden rounded-lg">
        <img
          src={imagePaths[imgIndex]}
          alt="Venue Photo"
          className="h-full w-full object-cover"
        />
      </div>
      {/* control */}
      <div className="mt-4 flex flex-row items-center justify-center gap-2">
        <CArrowRight
          className="[&>*]transition-colors [&>*]duration-300 size-8 rotate-180"
          hoverColor="hover:fill-[#6f6c8f]"
          onClick={leftClickHandler}
        />
        <p>
          {imgIndex + 1} / {imagePaths.length}
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
