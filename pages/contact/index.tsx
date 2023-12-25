import { Option } from "@material-tailwind/react";
import { Select } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

export default function Contact({}) {
  const router = useRouter();
  const [selectType, setSelectType] = useState<string>(undefined);
  const [selectText, setSelectText] = useState<string>(undefined);

  const submitContactHandler = () => {
    if (selectType === "") {
      alert("문의내용을 등록해주세요");
    } else if (selectText.length >= 3000) {
      alert("문의사항은 3000자 미만으로 적어주세요");
    } else {
      axios
        .post("/api/contact", { type: selectType, content: selectText })
        .then((res) => {
          alert("등록 완료. 빠른 시일내로 답변 드리겠습니다!");
          router.push("/");
        });
    }
  };

  const selectValues = [
    { value: "program", label: "프로그램 오류" },
    { value: "improvement", label: "개선사항" },
    { value: "etc", label: "기타" }
  ];

  return (
    <section>
      <div className="pt-11 pb-8 mb-10 w-full px-[10vw] m-auto bg-[#eeeeee]">
        <div>
          <sub>홈 / Contact</sub>
          <h1 className="mt-2 mb-2">
            <strong className="text-2xl">CONTACT</strong>
          </h1>
          <p className="text-gray-800">문의</p>
        </div>
      </div>
      <div className="px-[10vw] leading-8">
        <aside>
          {/* <p>홈페이지 피드백이나</p>
          <p>프로그램 버그 등을 등록해주세요</p>
          <br /> */}
          <Select
            variant="standard"
            label="분류"
            onChange={(val) => setSelectType(val)}
          >
            {selectValues.map((ele) => {
              return <Option value={ele.value}>{ele.label}</Option>;
            })}
          </Select>
          <div className="mt-4">
            <Textarea
              onChange={(value) => setSelectText(value.target.value)}
              // variant="static"
              label="문의사항을 적어주세요 (최대 3000자)"
              rows={8}
            />
          </div>
          <div className="flex w-full justify-between py-1.5">
            <IconButton variant="text" color="blue-gray" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </IconButton>
            <div className="flex gap-2">
              {/* <Button
                size="sm"
                color="red"
                variant="text"
                className="rounded-md"
              >
                Cancel
              </Button> */}
              <Button
                size="sm"
                className="rounded-md"
                onClick={() => {
                  submitContactHandler();
                }}
              >
                등록하기
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
