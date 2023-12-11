import React, { useState } from "react";

export type imgFile = {
  src: string;
  alt: string;
  className: string;
};

const index = () => {
  const [imgFiles, setImgFiles] = useState<imgFile[]>([
    {
      src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
      alt: "image 1",
      className: "h-full w-full object-cover"
    },
    {
      src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      alt: "image 2",
      className: "h-full w-full object-cover"
    },
    {
      src: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
      alt: "image 3",
      className: "h-full w-full object-cover"
    }
  ]);
  return (
    <div className="mt-20 mb-10">
      <div className="text-blue-400 text-xs">main index page css?</div>
      <div className="items-center justify-center">
        <h1 className="text-3xl font-bold underline">Testing</h1>
      </div>
      {/* <CarouselSlider imageFiles={imgFiles} /> */}
    </div>
  );
};

export default index;
