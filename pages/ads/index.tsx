import React from "react";

type Props = {};

const Ads = (props: Props) => {
  return (
    <section className="absolute top-0 z-10 w-full h-full">
      <div className="pt-11 pb-8 mb-10 w-full px-[10vw] m-auto bg-[#eeeeee]">
        <div>
          <sub>홈 / About</sub>
          <h1 className="mt-2 mb-2">
            <strong className="text-2xl">ABOUT</strong>
          </h1>
          <p className="text-gray-800">종구공방 소개</p>
        </div>
      </div>
    </section>
  );
};

export default Ads;
