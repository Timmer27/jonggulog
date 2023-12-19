import React, { useEffect, useState } from "react";
import { Avatar, Chip } from "@material-tailwind/react";
import { postInfo } from "./index";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Post({}) {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [postCardInfo, setPostCardInfo] = useState<postInfo | undefined>();
  // const [_] = postCardInfo;
  useEffect(() => {
    axios.get(`/api/post/${id}`).then((res) => {
      const data = res.data.map((val) => {
        return {
          id: val.id,
          title: val.title,
          tags: val.tags.split(","),
          content: val.content,
          publishedDate: val.p_date,
          owner: val.owner
        };
      });
      console.log("data", data);
      setPostCardInfo(data[0]);
    });
  }, []);
  return postCardInfo && (
    <div className="mt-24 lg:w-[60%] md:w-[60%] sm:w-[80%] m-auto h-full flex flex-col">
      <header>
        <h1 className="text-4xl mb-7 font-bold leading-[3.2rem]">
          {postCardInfo.title}
        </h1>
      </header>
      <sub className="flex border-b-2 pb-4 place-items-center">
        <Avatar
          size="md"
          variant="circular"
          alt="tania andrew"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          className="border-2 border-white mr-4"
        />
        <div className="flex flex-row gap-2">
          <div className="text-2xl font-bold">{postCardInfo.owner}</div>
          <div className="text-base self-center">|</div>
          {/* <div className="text-2xl">{postCardInfo.publishedDate}</div> */}
          <div className="text-2xl">2023.01.01</div>
        </div>
      </sub>
      <nav className="flex gap-3 p-3">
        <Chip size="lg" className="text-md" color="teal" value="업데이트" />
        <Chip size="lg" className="text-md" color="teal" value="잡다구리" />
      </nav>
      <section className="p-3 mt-5 leading-[2rem]">
        {postCardInfo.content}
      </section>
    </div>
  );
}
