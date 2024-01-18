import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../config/db");
export default function fetchPostData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, content, fileId, owner } = req.body;
    db.query(
        // p_date
      "INSERT INTO replies (id, content, fileId, owner) VALUES (?, ?, ?, ?)",
      [id, content, fileId, owner],
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
