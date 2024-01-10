import React from "react";
import KakaoAdfit from "../../components/kakaoAdfit";
// import AdfitWebComponent from 'react-adfit-web-component'

const Ads = () => {
  return (
    <section className="absolute top-0 z-10 w-full h-full">
      <div className="pt-11 pb-8 mb-10 w-full px-[10vw] m-auto bg-[#eeeeee]">
        <KakaoAdfit />
        {/* <AdfitWebComponent
             adUnit="DAN-Yzl3EuumxN8Zf2yX"
            /> */}
      </div>
    </section>
  );
};

export default Ads;
