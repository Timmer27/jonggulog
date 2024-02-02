import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Card,
  CardBody
} from "@material-tailwind/react";
import { BeakerIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import MetaHead from "../../../components/metaHead";
import KakaoAdfit from "../../../components/kakaoAdfit";
import ProgramPost from "../programPost";

const Blog = () => {
  const headerData = [
    {
      label: "설치법",
      value: "install",
      icon: BeakerIcon,
      desc: (
        <>
          <KakaoAdfit />
          <ProgramPost />
        </>
      )
    },
    {
      label: "코드 설명",
      value: "code",
      icon: CodeBracketIcon,
      desc: (
        <Card className="mt-3 mb-3">
          <CardBody>
            <Typography variant="h5" className="pb-3">
              추가 예정
            </Typography>
          </CardBody>
        </Card>
      )
    }
  ];
  return (
    <Tabs
      value="install"
      orientation="vertical"
      className="w-[95%] m-auto mt-12 lg:flex lg:flex-row lg:items-start md:flex-col sm:flex-col"
    >
      <MetaHead
        title="종구공방 - 서이추 자동화 무료 프로그램"
        description="귀찮은 서이추. 클릭 한번으로 쉽게 신청하자"
        // image=""
        url="https://jonggulog.vercel.app/programs/blog"
      />
      <TabsHeader className="lg:w-64 md:w-[95%] md:m-auto sm:w-[95%] sm:m-auto">
        {headerData.map(({ label, value, icon }) => (
          <Tab key={value} value={value} className="justify-start">
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {headerData.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="py-0">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};
export default Blog;
