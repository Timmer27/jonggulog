import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Carousel,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip
} from "@material-tailwind/react";

interface monthDateObj {
  first: number;
  last: number;
}

function index() {
  const [monthDate, setMonthDate] = useState<monthDateObj>();
  const [selectedDate, setSelectedDate] = useState<Number>();

  useEffect(() => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dateObj = { first: firstDay.getDate(), last: lastDay.getDate() };
    setMonthDate(dateObj);
    setSelectedDate(date.getDate());
  }, []);

  //   var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
  //   var last = first + 6; // last day is the first day + 6
  return (
    monthDate?.last && (
      <section>
        <article className="flex flex-row overflow-auto">
          {Array.from({ length: monthDate?.last }, (_, index) => {
            return (
              <Card className="mt-6 mx-3 w-96">
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    date: {index + 1}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2"
                  >
                    content1
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2"
                  >
                    content2
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button>Read More</Button>
                </CardFooter>
              </Card>
            );
          })}
        </article>
        <article className="w-full border-solid border-t-light-blue-600 rounded-md">
          <hgroup>
            <h1>참가자</h1>
            <h3>tim</h3>
            <h3>anyone</h3>
          </hgroup>
        </article>
        <article>
          <div className="w-full border-solid border-t-black rounded-md">
            <Button className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
              등록하기
            </Button>
            <div>main content here</div>
          </div>
          {/* <aside>aside posting and editing?</aside> */}
        </article>
      </section>
    )
  );
}

export default index;
