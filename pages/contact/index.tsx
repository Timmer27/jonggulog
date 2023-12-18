import { Input } from "@material-tailwind/react";
import React, { useRef, useState } from "react";

type Props = {};

export default function Contact({}: Props) {
  const textRef = useRef<HTMLTextAreaElement>();
  const selectRef = useRef<HTMLSelectElement>();

  const submitContactHandler = () => {
    const textValue = textRef.current.value;
    const selectedValue = selectRef.current.value;
    if (textValue === "") {
      alert("문의내용을 등록해주세요");
    } else {
      console.log("등록", selectedValue, textValue);
    }
  };

  return (
    <div className="mt-24 mb-10 lg:w-[68%] md:w-[68%] sm:w-[90%] m-auto shadow-[0px_0px_5px_0px_#d4d4d4] rounded-xl bg-clip-border h-fit p-[3rem_1rem]">
      <h6 className="block text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        문의하기
      </h6>
      <p className="block mt-2 mb-4 text-base antialiased font-normal text-[15px] leading-relaxed text-gray-700">
        버그나 문의사항을 등록해주세요
      </p>
      <form className="">
        <div className="flex flex-col gap-6 mb-1">
          <h6 className="block text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            문의 항목
          </h6>
          <div className="relative h-10 w-full min-w-[200px]">
            <select
              className="peer h-full w-full h rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              ref={selectRef}
            >
              <option value="program">프로그램 오류</option>
              <option value="improvement">개선사항</option>
              <option value="etc">기타</option>
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              항목 선택
            </label>
          </div>
          <h6 className="block -mb-3 text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
            문의내역
          </h6>
          <div className="relative w-full min-w-[200px] min-h-[10rem] h-56">
            <textarea
              ref={textRef}
              placeholder="문의사항을 적어주세요"
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
          </div>
        </div>
        <input
          type="file"
          multiple
          onChange={(file) => {
            console.log(file);
            console.log(file.target.size);
            // console.log(files);
            if (file.target.size > 2097152) {
              alert("File is too big!");
              this.value = "";
            }
          }}
        ></input>
        <button
          className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => {
            submitContactHandler();
          }}
        >
          등록하기
        </button>
      </form>
    </div>
  );
}
