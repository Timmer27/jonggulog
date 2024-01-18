import {
  Button,
  IconButton,
  Spinner,
  Typography
} from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import CustomeCell, { cellProps } from "./customeCell";
import Link from "next/link";
import { useQuery } from "react-query";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  const [active, setActive] = useState<number>(1);
  const maxNumPerPage = 7;
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["contactData"],
    retry: 5,
    queryFn: () =>
      fetch(`/api/contact`, {
        method: "GET"
      }).then((res) => res.json())
  });

  const next = () => {
    if (active === Math.ceil(data?.length / maxNumPerPage)) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  useEffect(() => {
    // https://cs310.hashnode.dev/3-ways-to-upload-files-to-google-cloud-storage-with-nextjs-and-formidable
    // 나중에 파일 업로드 참고하기
    refetch();
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="absolute z-10 w-[10%] h-[10%] p-[12px] top-[40%] left-[50%] bg-[#093f4f69] flex flex-col place-items-center place-content-center rounded-xl">
          <Spinner color="blue" className="h-12 w-12 mb-2" />
          <div className="text-white">로딩 중...</div>
        </div>
      )}
      <div className="pt-11 pb-8 mb-10 w-full px-[10vw] m-auto bg-[#eeeeee]">
        <div>
          <sub>홈 / Contact</sub>
          <h1 className="mt-2 mb-2">
            <strong className="text-2xl">CONTACT</strong>
          </h1>
          <p className="text-gray-800">문의</p>
        </div>
      </div>
      <div className="w-[80%] m-auto mb-3 flex place-content-end">
        <Link href={"/contact/submit"}>
          <Button
            size="sm"
            className="rounded-md"
            // }}
          >
            등록하기
          </Button>
        </Link>
      </div>
      {!isLoading && (
        <>
          <table className="table-auto w-[80%] m-auto">
            <tbody>
              {data
                .slice((active - 1) * maxNumPerPage, active * maxNumPerPage)
                .map((val) => {
                  console.log("val", val);
                  return (
                    <CustomeCell
                      id={val.id}
                      title={val.content}
                      type={val.type}
                      date={val.p_date}
                      name={val.owner}
                      status={val.status}
                      replyCnt={val.replyCnt}
                    />
                  );
                })}
            </tbody>
          </table>
          <div className="flex items-center justify-center gap-8 w-[80%] mx-auto my-4">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={prev}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-gray-900">{active}</strong> of{" "}
              <strong className="text-gray-900">
                {Math.ceil(data?.length / maxNumPerPage)}
              </strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={next}
              disabled={active === Math.ceil(data?.length / maxNumPerPage)}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}
