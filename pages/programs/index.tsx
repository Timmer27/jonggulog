import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardBody
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Image from "next/image";

const Programs = (Props) => {
  const router = useRouter();

  const data = [
    {
      label: "트레이딩 봇",
      value: "tradingBot",
      src: "/bot.png",
      alt: "bot",
      href: "/programs/trade",
      status: 1
    },
    {
      label: "서이추 봇",
      value: "naverProgram",
      src: "/blog.png",
      alt: "alt",
      href: "/programs/blog",
      status: 1
    },
    {
      label: "준비 중",
      value: "준비 중",
      src: "/question.png",
      alt: "alt",
      href: "/setting",
      status: 0
    }
  ];
  return (
    <>
      <div className="flex gap-4 lg:flex-row sm:flex-col sm:items-center col-span-4 mx-6 mt-5">
        {data.map((val, idx) => (
          <Card
            key={idx}
            className={`cursor-pointer mt-6 flex-[1_0_21%] min-h-[12rem] lg:max-w-[17rem] sm:w-[70%] sm:mt-3 shadow-[0px_0px_9px_-1px_#b3b3b347] ease-in-out duration-500 hover:-translate-y-1.5 hover:shadow-[0px_0px_11px_3px_#49494947]`}
            onClick={() => {
              if (val.status !== 1) {
                alert("준비 중!");
              } else {
                router.push(`${val.href}`);
              }
            }}
          >
            <CardBody className={`h-full flex flex-col justify-between`}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="lg:text-2xl md:text-xl sm:text-xl font-bold text-black">
                    {val.label}
                  </div>
                </div>
                <Image
                  src={val.src}
                  alt={val.alt}
                  width={65}
                  height={65}
                  className="lg:w-[4rem] md:w-[3rem] sm: w-[3rem]"
                />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Programs;
