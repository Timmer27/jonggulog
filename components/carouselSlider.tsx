import { Carousel } from "@material-tailwind/react";
import React from "react";
import { imgFile } from "../pages";

type imgFileProps = {
  imageFiles: Array<imgFile>;
};

const CarouselSlider = ({ imageFiles }: imgFileProps) => {
  console.log("imageFiles", imageFiles);
  return (
    <Carousel className="rounded-xl">
      {imageFiles.map((val) => {
        return <img src={val.src} alt={val.alt} className={val.className} />;
      })}
    </Carousel>
  );
};

export default CarouselSlider;
