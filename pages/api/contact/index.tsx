import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../config/db");
export default function fetchPostData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.id;
    if (id) {
      db.query(
        `SELECT
          c.*,
          r.content AS replyComment,
          r.fileId AS replyFile,
          r.p_date AS replyDate,
          r.owner AS replyOwner
        FROM contact c LEFT JOIN replies r ON c.id = r.id
          WHERE c.id = ?
          ORDER BY p_date DESC`,
        [id],
        function (err: any, result: any) {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            res.status(200).json(result);
          }
        }
      );
    } else {
      db.query(
        `SELECT
          c.*,
          r.content AS replyComment,
          r.fileId AS replyFile,
          r.p_date AS replyDate,
          r.owner AS replyOwner
        FROM contact c LEFT JOIN replies r ON c.id = r.id 
          GROUP BY c.id
          ORDER BY p_date DESC`,
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
  if (req.method === "POST") {
    const { type, content, pw, owner } = req.body;
    db.query(
      "INSERT INTO contact (type, content, pw, owner) VALUES (?, ?, ?, ?)",
      [type, content, pw, owner],
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
