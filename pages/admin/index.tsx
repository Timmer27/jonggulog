import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
// import transactionHandler from "../db/pool";
// import selectFetchHandler from "../db/pool";

interface postObj {
  type: string;
  title: string;
  content: string;
}

export default function MyEditor({ props }: any) {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>();
  const tagRef = useRef<HTMLInputElement>();
  const [contentData, setContentData] = useState<string>();

  const savePostHandler = async () => {
    const titleValue = titleRef.current.value || "";
    const tagValue = tagRef.current.value || "";
    if (!titleValue || !tagValue || !contentData) {
      alert("글 입력 ㄱ");
    } else {
      axios
        .post("/api/post/new", {
          title: titleValue,
          content: contentData,
          tags: tagValue,
          owner: "갓생종구"
        })
        .then((res) => {
          if (res.status === 200) {
            alert("저장 완료");
            router.push('/admin');

          } else {
            alert("에러");
            console.log("result", res);
          }
        });
    }
  };

  return (
    <div className="mt-12 m-auto w-[80%]">
      <div className="mb-5 flex justify-between">
        <Typography variant="h2" className="mb-5">
          글 작성
        </Typography>
        <Button
          className="h-fit"
          onClick={() => {
            savePostHandler();
          }}
        >
          저장
        </Button>
      </div>
      <div className="mb-5">
        <Input
          label="타이틀"
          crossOrigin={{}}
          inputRef={titleRef}
          className="mb-4"
        />
      </div>
      <div className="mb-5">
        <Input
          label="태그. comma 로 구분"
          crossOrigin={{}}
          inputRef={tagRef}
          className="mb-4"
        />
      </div>
      <ReactQuill
        value={contentData}
        onChange={(val) => {
          setContentData(val);
        }}
      />
    </div>
  );
}
