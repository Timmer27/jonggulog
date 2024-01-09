import { Button, Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CustomeCell from "./customeCell";
import Link from "next/link";
import { useQuery } from "react-query";

export default function Contact({}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>();
  const [fileName, setFileName] = useState<string>("");
  const [selectType, setSelectType] = useState<string>(undefined);
  const [selectText, setSelectText] = useState<string>(undefined);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["contactData"],
    retry: 5,
    queryFn: () =>
      fetch(`/api/contact`, {
        method: "GET",
      }).then((res) => res.json()),
  });

  useEffect(() => {
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
        <table className="table-auto w-[80%] m-auto">
          <tbody>
            {data.map((val) => {
              return (
                <CustomeCell
                  id={val.id}
                  title={val.content}
                  date={val.p_date.split('T')[0]}
                  name={val.owner}
                  status={val.status}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
