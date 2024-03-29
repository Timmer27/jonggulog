import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EllipsisText from "react-ellipsis-text";

export type cellProps = {
  id: number;
  title: string;
  type: string;
  content?: string;
  fileId?: string;
  pw?: string;
  name: string;
  date: string;
  status: number;
  replyCnt: number;
};

const CustomeCell = (props: cellProps) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const cellColor = "text-[#4b4b4b]";
  const typeName =
    props.type === "program"
      ? "프로그램 오류 건"
      : props.type === "improvement"
      ? "개선사항 문의"
      : "기타 문의";
  const statusName = props.replyCnt === 0 ? "답변 대기 중" : "답변 완료";
  const statusColor = props.replyCnt === 0 ? "bg-[#7a91ff]" : "bg-[darkgrey]";

  useEffect(() => {
    window.innerWidth < 550 && setIsMobile(true);
  }, []);

  return (
    <tr
      onClick={() => {
        router.push(`/contact/post?id=${props.id}`);
      }}
      className="border-[#e5e5e5] border-t-[1px] border-b-[1px] cursor-pointer"
    >
      <td>
        <div className="mx-2 my-4">
          <div className="flex">
            {!isMobile && (
              <img
                src="/question_contact.png"
                alt="question_contact"
                className="mr-2 mb-1"
                width={25}
              />
            )}
            <p className="text-md ">
              {/* {typeName} */}
              {props.title && (
                <EllipsisText text={props.title} length={22} />
              )}{" "}
            </p>
          </div>
          <div className="flex items-center">
            {isMobile ? (
              <>
                <p className={`text-sm mr-2 ${cellColor}`}>{props.date}</p>
              </>
            ) : (
              <>
                <p className={`text-sm mr-2 ${cellColor}`}>{props.name}</p>
                <p className={`text-sm mr-2 ${cellColor}`}>{props.date}</p>
                <p
                  className={`text-xs text-white ml-2 self-center border-[cadetblue] p-1 rounded-md bg-[cadetblue]`}
                >
                  {typeName}
                </p>
                <p
                  className={`text-xs text-white ml-2 self-center border-[#e5e5e5] p-1 rounded-md ${statusColor} `}
                >
                  {statusName}
                </p>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default CustomeCell;
