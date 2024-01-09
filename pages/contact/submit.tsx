import { Card, Option, Typography } from "@material-tailwind/react";
import { Select } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import shortid from "shortid";

export default function Contact({}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>();
  const pwInputRef = useRef<HTMLInputElement>();
  const [fileName, setFileName] = useState<string>("");
  const [selectType, setSelectType] = useState<string>(undefined);
  const [selectText, setSelectText] = useState<string>(undefined);

  const submitContactHandler = () => {
    const pw = pwInputRef.current.value
    if (!selectText || !selectType) {
      alert("문의내용을 등록해주세요");
    } else if (selectText.length >= 3000) {
      alert("문의사항은 3000자 미만으로 적어주세요");
    } else if (!pw) {
      alert("게시글 비밀번호를 적어주세요 (삭제/수정 시 필요)");
    } else {
      axios
        .post("/api/contact", {
          type: selectType,
          content: selectText,
          pw: pw,
          owner: shortid.generate()
        })
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
  // console.log('fileInputRef', fileInputRef?.current?.files[0])

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
            <div>
              <IconButton
                variant="text"
                color="blue-gray"
                size="sm"
                onClick={() => {
                  fileInputRef.current.click();
                }}
              >
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
              <span className="ml-2">
                {fileName.split("\\").slice(-1) || fileName}
              </span>
            </div>
            <input
              type="file"
              id="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={(val) => {
                setFileName(val.currentTarget.value);
              }}
            />
            <div className="flex gap-2">
              <input
                type="number"
                id="pw"
                placeholder="비밀번호"
                ref={pwInputRef}
                className="border border-[#b0bec5] rounded-md pl-3 w-24"
              />
              <Button
                size="sm"
                className="rounded-md"
                onClick={() => {
                  submitContactHandler();
                }}
              >
                저장
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
