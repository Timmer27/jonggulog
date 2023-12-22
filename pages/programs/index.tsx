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
import Description from "./desciption";

const Programs = (Props) => {
  const data = [
    {
      label: "트레이딩 봇",
      value: "tradingBot",
      icon: UserCircleIcon,
      // <Image src={'/bot.png'} alt="bot" width={30} height={30} />
      desc: <Description />,
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
