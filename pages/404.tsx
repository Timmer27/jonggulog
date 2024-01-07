import { Typography } from "@material-tailwind/react";

export default function Custom404() {
    return (
    <div className="flex w-full flex-col items-center mt-20">
        <img src="/404.png" alt="404" className="w-56" />
        <Typography variant="h6">
            페이지를 찾을 수 없어요 :(
        </Typography>
    </div>
    )
  }