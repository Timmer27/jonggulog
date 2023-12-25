import type { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../../config/db");
export default function fetchPostData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Retrieve URL parameters from req.query
  // console.log("judgeGb", test);
  // console.log("test2", test2);
  // console.log("req.req.query", req.query);

  if (req.method === "GET") {
    const { ticker, interval } = req.query;
    db.query(
      `SELECT
        ticker,
        \`interval\`,
        DATE_FORMAT(Open_time, '%Y-%m-%d %H:%i:%s') AS Open_time,
        \`Open\`,
        High,
        Low,
        \`Close\`,
        Volume
      FROM coin_data WHERE ticker = ? AND \`interval\` = ?`,
      [ticker, interval],
      function (err: any, result: any) {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
            const data = result.map((val) => {
                return({
                    x: val.Open_time,
                    y: [val.Open, val.High, val.Low, val.Close]
                })
            })
          res.status(200).json({chartData: data, originData: result});
        }
      }
    );
  }
}
