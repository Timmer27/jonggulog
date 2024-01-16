import { IconButton } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

export default function CustomeComment({ id }) {
  // id, content, fileId, owner
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const submitCommentHandler = () => {
    const content = textRef.current?.value;
    if (!content) {
      alert("댓글을 적어주세요");
    } else {
      axios
        .post("/api/comment", {
          id: id,
          content: content,
          fileId: "",
          owner: "갓생종구"
        })
        .then((res) => {
          alert("등록 완료.");
          router.push("/contact");
        });
    }
  };

  return (
    <>
      <textarea
        ref={textRef}
        name="textarea"
        id="textarea"
        cols={30}
        rows={3}
        placeholder="내용을 입력해주세요."
        className="p-5 w-full border mt-6 border-[#dadada] hover:border-[#acacac] focus:border-[#dadada] focus:outline-none rounded-md"
      />
      <div className="flex justify-between mb-24">
        <div>
          <IconButton
            variant="text"
            color="blue-gray"
            size="sm"
            onClick={() => {
              fileInputRef.current?.click();
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
          <span className="ml-2">file</span>
        </div>
        <button
          className="rounded-xl bg-black w-fit text-white px-4"
          onClick={() => {
            submitCommentHandler();
          }}
        >
          등록
        </button>
      </div>
    </>
  );
}
