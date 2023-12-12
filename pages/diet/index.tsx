import React, { createRef, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

import {
  Card,
  CardHeader,
  Textarea,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Popover,
  PopoverHandler,
  PopoverContent,
  Input,
  Select,
  Option
} from "@material-tailwind/react";

interface monthDateObj {
  month: number;
  first: number;
  last: number;
}

interface postObj {
  who: string;
  kg: number;
  content: string;
  dt: Date;
}

// 📌 useQueries -> useQuery를 하나로 묶기 가능
// const result = useQueries([
//     {
//       queryKey: ["data"],
//       queryFn: getData,
//       staleTime: 10000,
//       cacheTime: 50000,
//     },
//     {
//       queryKey: ["dummy"],
//       queryFn: getDummyData,
//       staleTime: 10000,
//       cacheTime: 50000,
//     },
//   ]);

const fetchPostData = async () => {
  const { data } = await axios.get("http://localhost:8084/post");
  return data;
};

// 📌 POST 하는 API
const addPost = async (dataObj: postObj) => {
  const { data } = await axios.post("http://localhost:8084/posted", dataObj);
  return data;
};

function index() {
  const participants = ["이종호", "이재빈"];

  const [monthDate, setMonthDate] = useState<monthDateObj>();
  const [selectedDate, setSelectedDate] = useState<Number>();
  const [savedPostInfo, setSavedPostInfo] = useState<postObj[]>();
  const [postInfo, setPostInfo] = useState<postObj>();
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery<postObj[]>(
    "fetch-postData",
    fetchPostData
  );
  // 📌 useMutation
  const { mutate, isError, isSuccess } = useMutation(addPost, {
    onMutate: (dataObj) => {
      console.log("mutation", dataObj);
    },

    onSuccess: (result, variables, context) => {
      // console.log("성공 메시지:", result);
      // console.log("변수:", variables);
      if (result.msg === "success") {
        alert("저장 완료 ");
      }
      setOpenPopover(false);
      //   console.log("onMutate에서 넘어온 값:", context);
    },

    onError: (error, variables, context) => {
      console.log("error", error);
    },

    onSettled: () => {
      queryClient.invalidateQueries("data");
    }
    // onSettled - 요청이 성공했거나 실패했을 경우 모두 발생한다.
    // invalidateQueries - "data" 쿼리를 갖는 쿼리를 무효화 시켜서 refetch 하여 데이터를 서버와 일치시킨다.
  });

  useEffect(() => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dateObj = {
      month: date.getMonth() + 1,
      first: firstDay.getDate(),
      last: lastDay.getDate()
    };
    setMonthDate(dateObj);
    setSelectedDate(date.getDate());
  }, []);

  console.log(isLoading, data, error);

  //   var first = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
  //   var last = first + 6; // last day is the first day + 6
  return (
    monthDate?.last && (
      <section onClick={() => {if(openPopover){setOpenPopover(false)}}}>
        <article className="flex flex-row overflow-auto">
          {Array.from({ length: monthDate?.last }, (_, index) => {
            return (
              <Card className="mt-8 mb-5 mx-3 min-w-[14rem]">
                {/* min-w-[10rem] */}
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {monthDate.month}월 {index + 1}일
                  </Typography>
                  {participants.map((val) => (
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2"
                  >
                    [{val}]데일리 kg: 
                  </Typography>
                  ))}
                </CardBody>
                <CardFooter className="pt-0">
                  <Button>하루 자세히 보기</Button>
                </CardFooter>
              </Card>
            );
          })}
        </article>
        <article className="w-full border-solid border-t-light-blue-600 rounded-md">
          <hgroup>
            <h1>참가자</h1>
            {participants.map((val) => (
              <h3>{val}</h3>
            ))}
          </hgroup>
        </article>
        <article>
          <div className="w-full border-solid border-t-black rounded-md">
            <Popover placement="bottom" open={openPopover}>
              <PopoverHandler
                onClick={() => {
                  console.log("뭐니");
                  setOpenPopover(!openPopover);
                }}
              >
                <Button>등록하기</Button>
              </PopoverHandler>
              <PopoverContent className="w-96">
                <Typography variant="h6" color="blue-gray" className="mb-6">
                  오늘 한일 적기
                </Typography>
                <div className="flex gap-2 flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-bold"
                  >
                    작성자 이름
                  </Typography>
                  <Select
                    label="누구?"
                    id="who"
                    onChange={(e) => {
                      console.log(e);
                      setPostInfo({ ...postInfo, who: e });
                    }}
                  >
                    {participants.map((val) => (
                      <Option key={val} value={val}>
                        {val}
                      </Option>
                    ))}
                  </Select>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-bold"
                  >
                    오늘 몸무게
                  </Typography>
                  <Input
                    size="lg"
                    id="kg"
                    // placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none"
                    }}
                    onChange={(e) =>
                      setPostInfo({
                        ...postInfo,
                        kg: parseFloat(e.target.value)
                      })
                    }
                    type="number"
                    crossOrigin={{}}
                  />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-bold"
                  >
                    뭐했음
                  </Typography>
                  <div className="w-full">
                    <Textarea
                      label="Message"
                      id="content"
                      onChange={(e) =>
                        setPostInfo({ ...postInfo, content: e.target.value })
                      }
                    />
                  </div>
                  <label htmlFor="file">
                    <Button
                      variant="gradient"
                      className="flex items-center gap-3"
                    >
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
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                      </svg>
                      Upload Files
                    </Button>
                  </label>
                  <Input crossOrigin={{ id: "file" }} type="file" id="file" />
                </div>
                <Button
                  variant="gradient"
                  className="flex-shrink-0"
                  onClick={() => {
                    // console.log(formRef)
                    if (!postInfo.content) {
                      alert("한게 없다고?");
                    } else if (!postInfo.who) {
                      alert("누구냐 위에 선택해");
                    } else if (!postInfo.kg) {
                      alert("오늘 몇키로야");
                    } else {
                      mutate({
                        who: postInfo.who,
                        kg: postInfo.kg,
                        content: postInfo.content,
                        dt: new Date()
                      });
                    }
                  }}
                >
                  저장
                </Button>
              </PopoverContent>
            </Popover>
            <div>main content here</div>
          </div>
          {/* <aside>aside posting and editing?</aside> */}
        </article>
      </section>
    )
  );
}

export default index;
