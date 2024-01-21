import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import EllipsisText from "react-ellipsis-text";

export function PostCard({ postCardInfo }) {
  const router = useRouter();
  const { id, tags, title, content, publishedDate, owner } = postCardInfo;

  const bannerUrl = tags.includes("개발일지")
    ? "/study.jpg"
    : tags.includes("비트코인")
    ? "/bot_update_banner.png"
    : "/study.jpg";
  console.log(";tags", tags, "bannerUrl", bannerUrl);

  return (
    <Card
      className="min-h-[24rem] max-h-[24rem] justify-between lg:w-[95%] lg:max-w-[24rem] md:w-[95%] md:max-w-[24rem] sm:w-[97%] overflow-hidden h-fit hover:scale-105 transition-all ease-in-out duration-400 cursor-pointer"
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
        {/* posting banner */}
        <img src={bannerUrl} alt="bot_update_banner" className="w-full" />
      </CardHeader>
      <CardBody className="p-3 lg:min-h-[12rem] lg:max-h-[10rem] md:min-h-[11rem] md:max-h-[7rem]">
        <div className="flex gap-2 items-center min-h-[5rem]">
          <Avatar
            size="md"
            variant="circular"
            alt="profile"
            src="/profile2.png"
            className="border-2 border-white hover:z-10"
          />
          {/* <Tooltip content="프로필">
          </Tooltip> */}
          <div className="">
            <Typography variant="h5" color="blue-gray">
              <EllipsisText text={title} length={"22"} />
            </Typography>
            <p color="blue-gray">{owner}</p>
          </div>
        </div>
        <p
          //   variant="lead"
          color="gray"
          className="mt-3 font-normal text-sm overflow-hidden whitespace-pre-line text-ellipsis max-h-[4rem]"
        >
          {/* <div>{content.replace(/ /g, "\u00A0")}</div> */}
          <div className="" dangerouslySetInnerHTML={{ __html: content }} />
        </p>
      </CardBody>
      <CardFooter className="flex items-center justify-between pt-1 self-end">
        <Typography className="text-base">{publishedDate}</Typography>
      </CardFooter>
    </Card>
  );
}
