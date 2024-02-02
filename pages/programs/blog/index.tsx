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
import MetaHead from "../../../components/metaHead";
import KakaoAdfit from "../../../components/kakaoAdfit";

const Blog = () => {
  const headerData = [
    {
      label: "설치법",
      value: "install",
      icon: BeakerIcon,
      desc: (
        <div>
          <KakaoAdfit />
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h5" className="pb-3 text-black">
                1. 아래 파일 다운받기 (현재는 윈도우 64bit만 지원합니다)
              </Typography>
              <a
                target="_blank"
                className="text-blue-700 font-bold underline"
                href="https://drive.google.com/file/d/16phJcz1JGJJjabmBB2SdIah2bRZaHxpu/view?usp=sharing"
                rel="noopener noreferrer"
              >
                다운로드 링크
              </a>
            </CardBody>
          </Card>
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h5" className="pb-3 text-black">
                2. 본인 크롬 브라우저 버전 확인하기
              </Typography>
              <p>
                크롬 브라우저 상단 링크에&nbsp;
                <span className="underline">chrome://settings/help</span>
                &nbsp;입력 후 버전을 확인해주세요
              </p>
              <div>
                <img
                  src="/chrome.png"
                  alt="chrome_version"
                  className="mt-3 rounded-md w-[35rem]"
                />
              </div>
            </CardBody>
          </Card>
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h5" className="pb-3 text-black">
                3. 버전에 맞는 크롬 설치파일 다운로드
              </Typography>
              <p>
                <p className="">
                  다운받은 폴더 내에 있는 드라이브는 120.* 버전입니다. 만약 다를
                  경우 아래 링크를 통해 재다운로드 해주세요.
                </p>
                <p className="mb-4 underline">(버전이 같을 경우 다운로드 불필요)</p>
                <div>
                  버전 120.*:{" "}
                  <a
                    target="_blank"
                    className="text-blue-700 font-bold underline"
                    href="https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/120.0.6099.109/win64/chrome-win64.zip"
                    rel="noopener noreferrer"
                  >
                    다운로드 링크
                  </a>
                </div>
                <div>
                  버전 121.*:{" "}
                  <a
                    target="_blank"
                    className="text-blue-700 font-bold underline"
                    href="https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/121.0.6167.47/win64/chrome-win64.zip"
                    rel="noopener noreferrer"
                  >
                    다운로드 링크
                  </a>
                </div>
                <div>
                  버전 122.*:{" "}
                  <a
                    target="_blank"
                    className="text-blue-700 font-bold underline"
                    href="https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/122.0.6226.2/win64/chrome-win64.zip	"
                    rel="noopener noreferrer"
                  >
                    다운로드 링크
                  </a>
                </div>
                <br />
                다른 자세한 버전은{" "}
                <a
                  target="_blank"
                  className="text-blue-700 font-bold underline"
                  href="https://googlechromelabs.github.io/chrome-for-testing/#stable"
                  rel="noopener noreferrer"
                >
                  다운로드 링크
                </a>{" "}
                확인
              </p>
            </CardBody>
          </Card>
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h5" className="pb-3 text-black">
                4. 중요!! 반드시 크롬 설치파일 다운받은 폴더 내에 넣기
              </Typography>
              <p>동일 폴더 내에 위치하지 않으면 실행 오류가 발생합니다.</p>
              <div>
                <img
                  src="/file_intro.png"
                  alt="file_intro"
                  className="mt-3 rounded-md w-[35rem]"
                />
              </div>
            </CardBody>
          </Card>
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h5" className="pb-3 text-black">
                5. 실행하기
              </Typography>
              <p>끝! 편하게 서이추하세요~</p>
            </CardBody>
          </Card>
          <Card className="mt-3 mb-3">
            <CardBody>
              <p className="pb-3 font-bold text-black">
                커피값 후원은 사랑입니다~
              </p>
              <img src="/code.png" alt="kakao_pay" />
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
