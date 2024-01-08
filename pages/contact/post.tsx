import { Button, Chip, IconButton } from "@material-tailwind/react";
import type { cellProps } from "./customeCell";
import { useRouter } from "next/router";
import { useQuery, QueryCache } from "react-query";
import Link from "next/link";
import { useEffect } from "react";

export default function ContactPost(props: cellProps) {
  const router = useRouter();
  const { asPath, pathname } = useRouter();
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
        <aside>
          <Link href={"/contact"} className="mt-7">
            <Button className="w-fit mb-10">뒤로 가기</Button>
          </Link>
          <p className="mb-1 pb-4 text-2xl border-[#e5e5e5] border-b-[1px]">
            {data.content}
          </p>

          <div className="w-fit text-center">
            <Chip
              size="md"
              className="text-sm"
              color="teal"
              value={
                data.type === "program"
                  ? "프로그램 오류"
                  : data.type === "improvement"
                  ? "개선사항"
                  : "기타"
              }
            />
          </div>

          <div className="mt-4 mb-6 pt-2">{data.content}</div>
          <div>
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
            <span className="ml-2">
              file
              {/* {props.fileId} */}
              {/* {fileName.split("\\").slice(-1) || fileName} */}
            </span>
          </div>
          {/* <div className="flex w-full py-1.5 justify-end">
            <div className="flex gap-2">
              <Button
                size="sm"
                className="rounded-md"
              >
                저장
              </Button>
            </div>
          </div> */}
        </aside>
      </div>
    )
  );
}
