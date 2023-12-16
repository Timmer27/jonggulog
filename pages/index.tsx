import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography
} from "@material-tailwind/react";
import React, { useState } from "react";

export type imgFile = {
  src: string;
  alt: string;
  className: string;
};

const MainPage = () => {
  return (
    <main className="mt-15 mb-10">
      <section className="flex gap-5 flex-row m-auto w-[80%] mt-11">
        <div className="flex w-[80%]">
          <Card className="w-full h-full">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                오신 것을 환영합니다
              </Typography>
              <Typography>세부 내용</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>Read More</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="gap-4 flex flex-col w-[40%]">
          <Card className="flex-1">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                사이드1 제목
              </Typography>
              <Typography>사이드1</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>Read More</Button>
            </CardFooter>
          </Card>
          <Card className="flex-1">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                사이드2 제목
              </Typography>
              <Typography>사이드2</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>Read More</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className="flex-1 flex gap-5 flex-row m-auto w-[80%]">
        <aside>
          <Card className="mt-6 w-96">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                하단 사이드1 제목
              </Typography>
              <Typography>하단 사이드1</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button>Read More</Button>
            </CardFooter>
          </Card>
        </aside>
      </section>
    </main>
  );
};

export default MainPage;
