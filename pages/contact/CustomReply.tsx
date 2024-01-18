import React from "react";
import { Avatar } from "@material-tailwind/react";

export type replyProps = {
  id?: number;
  name: string;
  content?: string;
  fileId?: string;
  date: string;
};

const CustomeReply = (props: replyProps) => {
  return (
    <div className="flex my-6">
      <Avatar
        size="md"
        variant="circular"
        alt="profile"
        src="/profile.png"
        className="border-2 border-white mr-4"
      />
      <div className="flex flex-col">
        <div className="flex mb-1">
          <p className="text-sm font-bold mr-4 text-[#3f3f3f]">{props.name}</p>
          <p className="text-sm text-[#979797]">{props.date}</p>
        </div>
        <div className="text-md text-[#727272]">{props.content}</div>
      </div>
    </div>
  );
};

export default CustomeReply;
