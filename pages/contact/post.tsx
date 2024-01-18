import React from "react";
import { Avatar, Button, Chip, IconButton } from "@material-tailwind/react";
import type { cellProps } from "./customeCell";
import { useRouter } from "next/router";
import { useQuery, QueryCache } from "react-query";
import Link from "next/link";
import { useEffect } from "react";
import CustomeReply from "./CustomReply";
import CustomeComment from "./CustomeComment";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export default function ContactPost(props: cellProps) {
  const { asPath, pathname } = useRouter();
  const session = useSession();

  console.log("testset", session, "useSession()", useSession());
  const id = asPath.split("/contact/post?id=")[1];

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["contactDatabyId"],
    retry: 5,
    queryFn: () => {
      return fetch(`/api/contact?id=${id}`, {
        method: "GET"
      }).then((res) => res.json());
    }
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    !isLoading && (
      <div className="px-[10vw] leading-8 mt-20">
        <aside className="mb-2">
          <Link href={"/contact"} className="mt-7">
            <ArrowLeftIcon width={35} className="mb-6" />
          </Link>
          <p className="mb-1 pb-4 text-2xl font-bold border-[#e5e5e5] border-b-[1px]">
            <div>
              {data[0].type === "program"
                ? "프로그램 오류 건"
                : data[0].type === "improvement"
                ? "개선사항 문의"
                : "기타 문의"}
            </div>
          </p>

          <div className="w-fit text-center">
            <Chip
              size="md"
              className="text-sm"
              color="teal"
              value={
                data[0].type === "program"
                  ? "프로그램 오류"
                  : data[0].type === "improvement"
                  ? "개선사항"
                  : "기타"
              }
            />
          </div>
          <div className="mt-4 mb-6 pt-2">{data[0].content}</div>
          <div className="">
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
            <span className="ml-2 m-4">file</span>
            <span className="text-sm font-normal text-[#9c9999]">
              {data[0].p_date}
            </span>
          </div>
        </aside>
        <div className="flex border-b-[1px] border-[#e5e5e5] mt-8 mb-4">
          <p>댓글</p>
          <p className="text-red-400 ml-2">
            {data[0].replyComment ? data.length : 0}
          </p>
        </div>
        {/* 댓글 존재 시 */}
        {data[0].replyComment &&
          data.map((val, idx) => (
            <CustomeReply
              key={idx}
              name={val.replyOwner}
              date={val.replyDate}
              content={val.replyComment}
            />
          ))}
        {session.status === "authenticated" &&
          session.data.user.email === "whdghtpgml@gmail.com" && (
            <CustomeComment id={id} />
          )}
      </div>
    )
  );
}
