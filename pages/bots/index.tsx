import React, { useRef, useState } from "react";
import type { TabsProps } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

type Props = {};

export default function Bots({}: Props) {
  const [activeTab, setActiveTab] = React.useState("html");
  const data = [
    {
      label: "자동매매",
      value: "자동매매",
      desc: `It really matters and then like it really doesn't matter.
        What matters is the people who are sparked by it. And the people 
        who are like offended by it, it doesn't matter.`,
    },
    {
      label: "백테스팅",
      value: "백테스팅",
      desc: `Because it's about motivating the doers. Because I'm here
        to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    // {
    //   label: "Vue",
    //   value: "vue",
    //   desc: `We're not always in the position that we want to be at.
    //     We're constantly growing. We're constantly making mistakes. We're
    //     constantly trying to express ourselves and actualize our dreams.`,
    // },
    // {
    //   label: "Angular",
    //   value: "angular",
    //   desc: `Because it's about motivating the doers. Because I'm here
    //     to follow my dreams and inspire other people to follow their dreams, too.`,
    // },
    // {
    //   label: "Svelte",
    //   value: "svelte",
    //   desc: `We're not always in the position that we want to be at.
    //     We're constantly growing. We're constantly making mistakes. We're
    //     constantly trying to express ourselves and actualize our dreams.`,
    // },
  ];
  return (
    <Tabs value="html" orientation="vertical">
      <TabsHeader className="w-32 mt-9">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
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
  //   );
}
