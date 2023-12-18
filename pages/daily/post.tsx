import React, { useState } from "react";
import {
  Avatar,
  Chip
} from "@material-tailwind/react";

export interface blogPostInfo {
  title: string;
  content: string;
}


export default function Post({ postCardInfo }) {
  // const [_] = postCardInfo;
  return (
    <div className="mt-24 lg:w-[60%] md:w-[60%] sm:w-[80%] m-auto h-full flex flex-col">
      <header>
        <h1 className="text-4xl mb-7 font-bold leading-[3.2rem]">
          [a11y] ARIA란? ARIA 상태 및 속성 알아보기 ARIA란?{" "}
        </h1>
      </header>
      <sub className="flex border-b-2 pb-4 place-items-center">
        <Avatar
          size="md"
          variant="circular"
          alt="tania andrew"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          className="border-2 border-white mr-4"
        />
        <div className="flex flex-row gap-2">
          <div className="text-2xl font-bold">작성자</div>
          <div className="text-base self-center">|</div>
          <div className="text-2xl">2023.01.01</div>
        </div>
      </sub>
      <nav className="flex gap-3 p-3">
        <Chip size="lg" className="text-md" color="teal" value="업데이트" />
        <Chip size="lg" className="text-md" color="teal" value="잡다구리" />
      </nav>
      <section className="p-3 mt-5 leading-[2rem]">
        ARIA는 네이티브 HTML만으로 관리할 수 없는 접근성 문제를 해결하기 위해
        사용된다. 예를들어 모달이나 슬라이더, 탭 패널은 이를 정확히 나타내는
        네이티브 HTML 태그가 존재하지 않기 때문에 시각장애를 가진 사람은 해당
        화면이 무엇을 나타내는지 확인할 수 없다. ARIA를 사용하면 일반 HTML로는
        대체 불가능한 형식의 요소들도 스크린 리더가 올바르게 해석할 수 있다.
      </section>
    </div>
  );
}
