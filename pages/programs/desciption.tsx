import React, { useEffect, useState } from "react";
import { Avatar, Button, Chip } from "@material-tailwind/react";

export default function Description({}) {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("no");
//   const [postCardInfo, setPostCardInfo] = useState<postInfo | undefined>();

//   useEffect(() => {
//     axios.get(`/api/post/${id}`).then((res) => {
//       const data = res.data.map((val: any) => {
//         return {
//           id: val.id,
//           title: val.title,
//           tags: val.tags.split(","),
//           content: val.content,
//           publishedDate: val.p_date,
//           owner: val.owner
//         };
//       });
//       setPostCardInfo(data[0]);
//     });
//   }, [id]);
  return (
      <div className="pl-6 w-full m-auto h-full flex flex-col">
        {/* <Link href={"/daily"}>
          <Button className="w-28 mb-10">뒤로 가기</Button>
        </Link> */}
        <header>
          <h1 className="text-4xl mb-7 font-bold leading-[3.2rem]">
            {/* {postCardInfo.title} */}
            testtesttesttest
          </h1>
        </header>
        <sub className="flex border-b-2 pb-4 place-items-center">
          <Avatar
            size="md"
            variant="circular"
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            className="border-2 border-white mr-4"
          />
          <div className="flex flex-row gap-2">
            <div className="text-xl">testtesttesttest</div>
            {/* <div className="text-xl">{postCardInfo.owner}</div> */}
            <div className="text-base self-center">|</div>
            {/* <div className="text-2xl">{postCardInfo.publishedDate}</div> */}
            <div className="text-xl">
              {/* {postCardInfo.publishedDate.toString()} */}
              testtesttesttest
            </div>
          </div>
        </sub>
        <nav className="flex gap-3 p-3">
          <Chip size="md" className="text-sm" color="teal" value="업데이트" />
          <Chip size="md" className="text-sm" color="teal" value="잡다구리" />
        </nav>
        <section className="p-3 mt-5 leading-[2rem]">
          {/* <div dangerouslySetInnerHTML={{ __html: postCardInfo.content }} /> */}
          testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
        </section>
      </div>
    )
}
