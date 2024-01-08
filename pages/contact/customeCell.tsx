import { useRouter } from "next/router";
import EllipsisText from "react-ellipsis-text";

export type cellProps = {
  id: number;
  title: string;
  content?: string;
  fileId?: string;
  pw?: string;
  name: string;
  date: string;
  status: number;
};

export const CustomeCell = (props: cellProps) => {
  const router = useRouter();
  const cellColor = "text-[#4b4b4b]";
  const statusName = props.status === 0 ? "대기 중" : "답변 완료";
  const statusColor = props.status === 0 ? "bg-[#7a91ff]" : "bg-[darkgrey]";
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
            <img
              src="/question_contact.png"
              alt="question_contact"
              className="mr-2 mb-1"
              width={25}
            />
            <p className="text-md">
              <EllipsisText text={props.title} length={"22"} />{" "}
            </p>
          </div>
          <div className="flex items-center">
            <p className={`text-sm mr-2 ${cellColor}`}>{props.name}</p>
            <p className={`text-sm mr-2 ${cellColor}`}>{props.date}</p>
            <p
              className={`text-xs text-white ml-2 self-center border-[#e5e5e5] p-1 rounded-md ${statusColor} `}
            >
              {statusName}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
};
