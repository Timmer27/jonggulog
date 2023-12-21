import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import Description from "../desciption";
import { IndicatorTable } from "./indicatorTable";

// next js -> ssr 개별 세팅
const CandleChart = dynamic(() => import("./candleChart"), {
  ssr: false
});

// 참고
// https://github.com/react-financial/react-financial-charts
// https://codesandbox.io/p/sandbox/react-financial-charts-demo-forked-96uyw?file=%2Fsrc%2Findex.js%3A203%2C15
// https://velog.io/@turtlemana/React-financial-charts-%EC%82%AC%EC%9A%A9-%EC%84%A4%EB%AA%85%EC%84%9C

const Programs = (Props) => {
  const data = [
    {
      label: "백테스팅",
      value: "backtest",
      icon: UserCircleIcon,
      // <Image src={'/bot.png'} alt="bot" width={30} height={30} />
      desc: (
        <div className="flex flex-col">
          <CandleChart />
          <Typography variant="h4" className="mt-4 mb-2">
            backtesting
          </Typography>
          <IndicatorTable />
        </div>
      )
      //   desc: <Description />,
    },
    {
      label: "자동매매 (업데이트 예정)",
      value: "autoTrade",
      icon: Square3Stack3DIcon,
      desc: "test"
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`
    }
  ];
  return (
    <Tabs
      value="backtest"
      orientation="vertical"
      className="w-[95%] m-auto mt-12"
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
