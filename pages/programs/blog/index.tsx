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
import Link from "next/link";

const Blog = () => {
  const headerData = [
    {
      label: "설치법",
      value: "install",
      icon: BeakerIcon,
      desc: (
        <div>
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h4" className="pb-3">
                1. 아래 파일 다운받기
              </Typography>
              <li>
                <a
                  target="_blank"
                  className="text-blue-700 font-bold underline"
                  href="https://drive.google.com/file/d/1uL4UNGyilJ8yeKUSjTymO8XZF-XafsKs/view?usp=drive_link"
                  rel="noopener noreferrer"
                >
                  다운로드 링크
                </a>
              </li>
              {/* <Typography variant="lead">asdsa</Typography> */}
            </CardBody>
          </Card>
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h4" className="pb-3">
                2. 파일 압축 해제하기
              </Typography>
              <p>그 후 실행하고 사용하기</p>
              {/* <Typography variant="lead">asdsa</Typography> */}
            </CardBody>
          </Card>
        </div>
      )
    },
    {
      label: "코드 설명",
      value: "code",
      icon: CodeBracketIcon,
      desc: (
        <Card className="mt-3 mb-3">
          <CardBody>
            <Typography variant="h4" className="pb-3">
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
      className="w-[95%] m-auto mt-12"
    >
      <TabsHeader className="w-64">
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
