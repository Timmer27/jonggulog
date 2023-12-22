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
import Description from "./desciption";
import { useRouter } from "next/router";

const Programs = (Props) => {
  const cardShadowStyle =
    "shadow-[0px_0px_9px_-1px_#b3b3b347] ease-in-out duration-500 hover:-translate-y-1.5 hover:shadow-[0px_0px_11px_3px_#49494947]";
  const router = useRouter();

  const data = [
    {
      label: "트레이딩 봇",
      value: "tradingBot",
      href: "/programs/trade"
    },
    {
      label: "서이추 봇",
      value: "naverProgram",
      href: "/programs/blog"
    },
    {
      label: "Settings",
      value: "settings",
      href: "/setting"
    }
  ];
  return (
    <>
      {data.map((val, idx) => (
        <Card
          key={idx}
          className={`mt-6 flex-[1_0_21%] min-h-[12rem] ${cardShadowStyle}`}
          onClick={() => router.push(`${val.href}`)}
        >
          <CardBody className={`h-full flex flex-col justify-between`}>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-black">{val.label}</div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
export default Programs;
