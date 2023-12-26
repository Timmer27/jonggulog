import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <section>
      <div className="pt-11 pb-8 mb-10 w-full px-[10vw] m-auto bg-[#eeeeee]">
        <div>
          <sub>홈 / About</sub>
          <h1 className="mt-2 mb-2">
            <strong className="text-2xl">ABOUT</strong>
          </h1>
          <p className="text-gray-800">종구공방 소개</p>
        </div>
      </div>
      <div className="px-[10vw] leading-8">
        <section>
          <p>유튜브에서 소개한 프로그램들을</p>
          <p>좀더 간편하게 받을 수 있는 웹사이트를 하나 만들었습니다</p>
          <br />
          <p>그 외에도,</p>
          <ul className="list-decimal ml-6">
            <li>기술용 블로그</li>
            <li>일기장</li>
            <li>만든 프로그램 업데이트 버전</li>
          </ul>
          <br />
          <p>기록 예정!</p>
        </section>
      </div>
    </section>
  );
};

export default About;
