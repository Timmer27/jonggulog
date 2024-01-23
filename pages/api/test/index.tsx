import type { NextApiRequest, NextApiResponse } from "next";
export default async function fetchPostData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ result: "hello world" });
}
