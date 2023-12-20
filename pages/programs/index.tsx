import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";


// next js -> ssr 개별 세팅 
const CandleChart = dynamic(() => import("./candleChart"), {
  ssr: false,
});

// 참고
// https://github.com/react-financial/react-financial-charts
// https://codesandbox.io/p/sandbox/react-financial-charts-demo-forked-96uyw?file=%2Fsrc%2Findex.js%3A203%2C15
// https://velog.io/@turtlemana/React-financial-charts-%EC%82%AC%EC%9A%A9-%EC%84%A4%EB%AA%85%EC%84%9C

const Programs = (Props) => {
  const data = [
    {
      label: "트레이딩 봇",
      value: "tradingBot",
      icon: UserCircleIcon,
      // <Image src={'/bot.png'} alt="bot" width={30} height={30} />
      desc: <CandleChart />,
    },
    {
      label: "서이추 봇",
      value: "naverProgram",
      icon: Square3Stack3DIcon,
      desc: "test",
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <Tabs
      value="tradingBot"
      orientation="vertical"
      className="w-[68%] m-auto mt-12"
    >
      <TabsHeader className="w-64">
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value} className="justify-start">
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="py-0">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default Programs;
