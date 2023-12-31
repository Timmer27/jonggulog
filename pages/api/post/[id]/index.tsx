import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../config/db");
export default function fetchPostData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Retrieve URL parameters from req.query
  // console.log("judgeGb", test);
  // console.log("test2", test2);
  // console.log("req.req.query", req.query);

  // post 일 시 insert
  // put 일 시 edit
  // delete 일 시 삭제
  // get 일 시 fecth => -1 일 경우 전부 fetch 숫자는 id 값 별로 fetch
  if (req.method === "POST") {
    const { title, content, owner, tags } = req.body;
    db.query(
      "INSERT INTO posting (title, content, owner) VALUES (?, ?, ?)",
      [title, content, owner],
      function (err: any, result: any) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          const insertId = result.insertId;
          const insertTags = tags.split(",").map((val) => {
            return `(${insertId}, '${val.trim()}')`;
          });
          db.query(
            `INSERT INTO posting_tags (id, tags) VALUES ${insertTags}`,
            function (err: any, result: any) {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                res.status(200).send(result);
              }
            }
          );
        }
      }
    );
  } else if (req.method === "GET") {
    // Your database query logic
    const id = req.query.id;
    if (id === "all") {
      db.query(
        `
        WITH tmp AS (SELECT id, GROUP_CONCAT(tags) tags FROM posting_tags GROUP BY id)
          SELECT
            p.id,
            p.title,
            p.content,
            CASE
              WHEN INSTR(DATE_FORMAT(p.p_date, '%Y-%m-%d %p %h:%i'), 'PM') > 0
              THEN REPLACE(DATE_FORMAT(p.p_date, '%Y-%m-%d %p %h:%i'), 'PM', '오후')
              ELSE REPLACE(DATE_FORMAT(p.p_date, '%Y-%m-%d %p %h:%i'), 'AM', '오전')    
            END AS p_date,
            p.owner,
            t.tags
          FROM posting p LEFT JOIN tmp t ON p.id = t.id
            ORDER BY p.p_date DESC
          `,
        function (err: any, result: any) {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error", log: err});
          } else {
            res.json(result);
          }
        }
      );
    } else {
      db.query(
        `WITH tmp AS (SELECT id, GROUP_CONCAT(tags) tags FROM posting_tags GROUP BY id)
        SELECT
          p.id,
          p.title,
          p.content,
          CASE
            WHEN INSTR(DATE_FORMAT(p.p_date, '%Y-%m-%d %p %h:%i'), 'PM') > 0
            THEN REPLACE(DATE_FORMAT(p.p_date, '%Y-%m-%d %p %h:%i'), 'PM', '오후')
            ELSE REPLACE(DATE_FORMAT(p.p_date, '%Y-%m-%d %p %h:%i'), 'AM', '오전')    
          END AS p_date,
          p.owner,
          t.tags
        FROM posting p LEFT JOIN tmp t ON p.id = t.id
          WHERE t.id = ?
        ;`,
        [id],
        function (err: any, result: any) {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            res.json(result);
          }
        }
      );
    }
  }else{
    res.status(200).send({ error: "Method not allowed." });
  }
}
