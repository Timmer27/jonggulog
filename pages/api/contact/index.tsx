import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../config/db");
export default function fetchPostData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { type, content } = req.body;
    db.query(
      "INSERT INTO contact (type, content, owner) VALUES (?, ?, ?)",
      [type, content, 'tmp'],
      function (err: any, result: any) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(result);
        }
      }
    );
  }
}
