import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import EllipsisText from "react-ellipsis-text";

export function PostCard({ postCardInfo }) {
  const router = useRouter();
  const { id, tags, title, content, publishedDate, owner } = postCardInfo;

  return (
    <Card
      className="lg:w-[95%] lg:max-w-[24rem] md:w-[95%] md:max-w-[24rem] sm:w-[97%] overflow-hidden h-fit hover:scale-105 transition-all ease-in-out duration-400 cursor-pointer"
      onClick={() => {
        // router.push(`/daily/post/${id}`);
        router.push(`/daily/post?no=${id}`);
      }}
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none lg:max-h-[10rem]"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
          className="w-full"
        />
      </CardHeader>
      <CardBody className="p-3 lg:min-h-[12rem] lg:max-h-[10rem] md:min-h-[7rem] md:max-h-[7rem]">
        <div className="flex gap-2 items-center min-h-[5rem]">
          <Tooltip content="설명">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <div className="">
            <Typography variant="h5" color="blue-gray">
              <EllipsisText text={title} length={"18"} />
            </Typography>
            <p color="blue-gray">{owner}</p>
          </div>
        </div>
        <p
          //   variant="lead"
          color="gray"
          className="mt-3 font-normal text-sm overflow-hidden whitespace-nowrap text-ellipsis max-h-[4rem]"
        >
          <div className="" dangerouslySetInnerHTML={{ __html: content }} />
        </p>
      </CardBody>
      <CardFooter className="flex items-center justify-between pt-1 self-end">
        <Typography className="text-base">{publishedDate}</Typography>
      </CardFooter>
    </Card>
  );
}
