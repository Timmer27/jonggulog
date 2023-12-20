import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography
} from "@material-tailwind/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export type imgFile = {
  src: string;
  alt: string;
  className: string;
};

const cardShadowStyle =
  "shadow-[0px_0px_9px_-1px_#b3b3b347] ease-in-out duration-500 hover:-translate-y-1.5 hover:shadow-[0px_0px_11px_3px_#49494947]";

const fadeOut = "opacity-100 translate-y-0";
const fadeIn = "opacity-0 translate-y-10 transition-all ease-in-out";
const MainPage = () => {
  const asideItems = [
    {
      key: 0,
      title: "트레이딩 봇",
      sub: "비트코인",
      content: "트레이딩 자동화 봇",
      src: "/bot.png",
      alt: "bot",
      status: 1
    },
    {
      key: 1,
      title: "서이추 봇",
      sub: "네이버",
      content: "블로그 서이추 자동화 봇",
      src: "/blog.png",
      alt: "alt",
      status: 1
    },
    {
      key: 2,
      title: "준비 중",
      sub: "",
      content: "",
      src: "/question.png",
      alt: "alt",
      status: 0
    },
    {
      key: 3,
      title: "준비 중",
      sub: "",
      content: "",
      src: "/question.png",
      alt: "alt",
      status: 0
    }
  ];

  const [mounted, setMounted] = useState<boolean>(false);
  const router = useRouter();
  const routeToPagesHandler = (link) => {
    router.push(link);
  };

  useEffect(() => {
    // Set mounted to true after the component is mounted
    setMounted(true);
  }, []);

  return (
    <main className="mt-15 mb-10 w-[68%] m-auto">
      <section className="flex gap-5 flex-row mt-11">
        <div className="flex w-[80%]">
          <Card
            className={`w-full h-full justify-between ${cardShadowStyle} ${
              mounted ? fadeOut : `delay-[200ms] ${fadeIn}`
            }`}
          >
            <CardBody>
              <Typography variant="h3" color="blue-gray" className="mb-2 pb-2">
                {/* 종구공방 */}에 오신 것을 환영합니다
              </Typography>
              <Typography className="font-bold text-[2vh]">
                {/* 자동화 프로그램 무료배포  */} 플랫폼
              </Typography>
              {/* <Typography>유튜브 구독 좋아요 감사감사</Typography> */}
            </CardBody>
            <CardFooter className="pt-0 self-end flex gap-2">
              <a
                href="#"
                target="_blank"
                onClick={() => {
                  alert("유튜브!");
                }}
              >
                <img src="/youtube.svg" alt="youtbue" className="w-10" />
              </a>
              <a
                href="#"
                target="_blank"
                onClick={() => {
                  alert("네이버!");
                }}
              >
                <img src="/naver.svg" alt="naver" className="w-10" />
              </a>
              <a href="https://github.com/Timmer27" target="_blank">
                <img src="/github.svg" alt="github" className="w-10" />
              </a>
              {/* <Button>유튜브, 네이버, 깃허브?</Button> */}
            </CardFooter>
          </Card>
        </div>
        <div className="gap-4 flex flex-col w-[40%]">
          <Card
            className={`flex-1 cursor-pointer ${cardShadowStyle} bg-[#193e4b]  ${
              mounted ? `${fadeOut}` : `delay-[400ms] ${fadeIn}`
            }`}
            onClick={() => routeToPagesHandler("/daily")}
          >
            <CardBody>
              <Typography variant="h3" color="white" className="mb-2 pb-2">
                {/* 공방 */} 일상 글
              </Typography>
              <Typography className="font-bold text-[2vh]" color="white">
                각종 업데이트 안내 및 개인 정리글
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <p className="self-end text-end text-white font-bold">바로가기</p>
            </CardFooter>
          </Card>
          <Card
            className={`flex-1 cursor-pointer ${cardShadowStyle} bg-[#73babc] ${
              mounted ? `${fadeOut}` : `delay-[600ms] ${fadeIn}`
            }`}
            onClick={() => routeToPagesHandler("/contact")}
          >
            {/* [#1f7a8c] [#bfdbf7] */}
            <CardBody>
              <Typography variant="h3" color="white" className="mb-2 pb-2">
                문의사항
              </Typography>
              <Typography className="font-bold text-[2vh]" color="white">
                프로그램 개선사항 및 버그제보
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <p className="self-end text-end text-white font-bold">바로가기</p>
            </CardFooter>
          </Card>
        </div>
      </section>
      {/* <section className="flex-1 flex flex-col m-auto items-center mt-12">
        <div>
        <strong className="text-xl text-blue-gray-800">취미로 개발해둔</strong>
        </div>
        <div>
        <strong className="text-3xl">공방 무료 컨텐츠</strong>
        </div>
      </section> */}
      <section className="flex-1 flex gap-5 flex-row m-auto">
        <aside className="flex flex-wrap gap-6 w-full">
          {asideItems.map((val, idx) => {
            const isReady = val.status === 1 ? "cursor-pointer" : "cursor-not-allowed opacity-80 pointer-events-none"
            return (
              <Card
                key={idx}
                className={`mt-6 flex-[1_0_21%] min-h-[12rem] ${isReady} ${cardShadowStyle} ${
                  mounted ? `${fadeOut}` : `${fadeIn}`
                }`}
                onClick={() => routeToPagesHandler("/programs")}
              >
                <CardBody className="h-full flex flex-col justify-between ${isReady}">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <p className="mb-2">{val.sub}</p>
                      <div className="text-2xl font-bold text-black">{val.title}</div>
                    </div>
                    <Image
                      src={val.src}
                      alt={val.alt}
                      width={65}
                      height={65}
                    ></Image>
                  </div>
                  <Typography className="text-md">{val.content}</Typography>
                </CardBody>
              </Card>
            );
          })}
        </aside>
      </section>
    </main>
  );
};

export default MainPage;
