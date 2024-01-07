import { Button } from "@material-tailwind/react";
import React from "react";

const DownloadButton = ({ jsonArray, fileName }) => {
  const downloadJson = () => {
    const jsonString = JSON.stringify(jsonArray, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return <Button onClick={downloadJson} variant="filled">다운로드</Button>;
};

export default DownloadButton;
