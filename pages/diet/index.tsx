import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
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

  useEffect(() => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dateObj = { first: firstDay.getDate(), last: lastDay.getDate() };
    setMonthDate(dateObj);
  }, []);

  //   var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
  //   var last = first + 6; // last day is the first day + 6
  return (
    monthDate?.last && (
      <div>
        <div className="flex flex-row overflow-auto">
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
        </div>
        <h1>here is the main diary?</h1>
      </div>
    )
  );
}

export default index;
