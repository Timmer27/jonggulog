import React, { useEffect, useState } from "react";
import { Avatar, Button, Chip } from "@material-tailwind/react";
import { postInfo } from "./index";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Post({}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("no");
  const [postCardInfo, setPostCardInfo] = useState<postInfo | undefined>();

  useEffect(() => {
    axios.get(`/api/post/${id}`).then((res) => {
      const data = res.data.map((val: any) => {
        return {
          id: val.id,
          title: val.title,
          tags: val.tags.split(","),
          content: val.content,
          publishedDate: val.p_date,
          owner: val.owner
        };
      });
      setPostCardInfo(data[0]);
    });
  }, [id]);
  return (
    postCardInfo && (
      <div className="p-7 lg:w-[65%] md:w-[65%] sm:w-[80%] m-auto h-full flex flex-col bg-white">
        <Link href={"/daily"} className="mt-7">
          <Button className="w-28 mb-10">뒤로 가기</Button>
        </Link>
        <header>
          <h1 className="text-4xl mb-7 font-bold leading-[3.2rem]">
            {postCardInfo.title}
          </h1>
        </header>
        <sub className="flex border-b-2 pb-4 place-items-center">
          <Avatar
            size="md"
            variant="circular"
            alt="profile"
            src="/profile.png"
            className="border-2 border-white mr-4"
          />
          <div className="flex flex-row gap-2">
            <div className="text-xl">{postCardInfo.owner}</div>
            <div className="text-base self-center">|</div>
            {/* <div className="text-2xl">{postCardInfo.publishedDate}</div> */}
            <div className="text-xl">
              {postCardInfo.publishedDate.toString()}
            </div>
          </div>
        </sub>
        <nav className="flex gap-3 p-3">
          {postCardInfo.tags.map((val) => {
            return (
              <Chip size="md" className="text-sm" color="teal" value={val} />
            );
          })}
        </nav>
        <section className="p-3 mt-5 leading-[2rem]">
          <div dangerouslySetInnerHTML={{ __html: postCardInfo.content }} />
        </section>
      </div>
    )
  );
}
