import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

interface postObj {
  type: string;
  title: string;
  content: string;
}

export default function MyEditor({ props }: any) {
  const titleRef = useRef<HTMLInputElement>();
  const [contentData, setContentData] = useState<string>();

  const savePostHandler = () => {
    const targetvalue = titleRef.current.value || "";
    if (!targetvalue || !contentData) {
      alert("글 입력 ㄱ");
    } else {
      const title = titleRef.current.value;
      console.log(contentData, title);
      // const title = titleRef.current.value
      // console.log
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
          inputRef={titleRef}
          className="mb-4"
        />
      </div>

      {/* <CKEditor
        editor={ClassicEditor}
        data=""
        // onInit={(editor) => {
        // You can store the "editor" and use when it is needed.
        //   console.log("Editor is ready to use!", editor);
        // }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContentData(data);
        }}
      /> */}
    </div>
  )
}
