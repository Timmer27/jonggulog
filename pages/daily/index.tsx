import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
  Input
} from "@material-tailwind/react";
import { PostCard } from "../../components/postCard";

export interface postInfo {
  _key: Number;
  title: string;
  sub: string;
  content: string;
  publishedDate: Date;
}

export default function Daily({}) {
  const [activeTab, setActiveTab] = React.useState<string>("latest");
  const [postCardInfo, setPostCardInfo] = useState<postInfo[] | undefined>([
    {
      _key: 1,
      title: "string",
      sub: "string",
      content: "string",
      publishedDate: new Date()
    },
    {
      _key: 2,
      title: "string",
      sub: "string",
      content: "string",
      publishedDate: new Date()
    },
    {
      _key: 3,
      title: "string",
      sub: "string",
      content: "string",
      publishedDate: new Date()
    },
    {
      _key: 4,
      title: "string",
      sub: "string",
      content: "string",
      publishedDate: new Date()
    },
    {
      _key: 5,
      title: "string",
      sub: "string",
      content: "string",
      publishedDate: new Date()
    },
    {
      _key: 6,
      title: "string",
      sub: "string",
      content: "string",
      publishedDate: new Date()
    },
  ]);
  const data = [
    {
      label: "최신",
      value: "latest",
      desc: postCardInfo.map((val) => {
        return <PostCard postCardInfo={val} />;
      })
    },
    {
      label: "업데이트",
      value: "update",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`
    }
  ];
  return (
    <Tabs value={activeTab} className="mt-10 ml-7">
      <div className="flex gap-5 px-4 pt-4 pb-5">
        <TabsHeader
          className="w-56"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none"
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-gray-800 font-bold" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <div className="hidden items-center gap-x-2 lg:flex">
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              crossOrigin={{}}
              type="search"
              placeholder="Search"
              containerProps={{
                className: "min-w-[288px]"
              }}
              className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
              labelProps={{
                className: "before:content-none after:content-none"
              }}
            />
            <div className="!absolute left-3 top-[13px]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="#CFD8DC"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="#CFD8DC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <Button size="md" className="rounded-lg bg-blue-gray-500">
            검색
          </Button>
        </div>
      </div>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel
            key={value}
            value={value}
            className="grid lg:grid-cols-5 md:grid-cols-4 gap-4"
          >
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
