import { Queue } from "bullmq";
const redis = require("redis");
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
const db = require("../../../../config/db");
var ccxt = require("ccxt");

// Function to fetch own future balance
async function getFutureBalance(binance) {
  try {
    const balance = await binance.fapiPrivateGetAccount();
    console.log("Future Balance:", balance);
  } catch (error) {
    console.error("Error fetching future balance:", error.message);
  }
}

// Function to create a market order for a long position
async function createLongOrder(binance, leverage, symbol, quantity) {
  try {
    const order = await binance.fapiPrivatePostOrder({
      symbol,
      side: "BUY",
      type: "MARKET",
      quantity,
      leverage
    });
    console.log("Long Order Created:", order);
  } catch (error) {
    console.error("Error creating long order:", error.message);
  }
}

// Function to create a market order for a short position
async function createShortOrder(binance, leverage, symbol, quantity) {
  try {
    const order = await binance.fapiPrivatePostOrder({
      symbol,
      side: "SELL",
      type: "MARKET",
      quantity,
      leverage
    });
    console.log("Short Order Created:", order);
  } catch (error) {
    console.error("Error creating short order:", error.message);
  }
}

// Function to fetch real-time ticker data
async function getTickerData(binance, symbol) {
  try {
    const ticker = await binance.fapiPublicGetTicker24hr({ symbol });
    console.log("Ticker Data:", ticker);
  } catch (error) {
    console.error("Error fetching ticker data:", error.message);
  }
}

// Function to fetch Kline data (candlestick) for a given symbol and interval
async function getKlineData(binance, symbol, interval) {
  try {
    const klines = await binance.fapiPublicGetKlines({ symbol, interval });
    console.log(`Kline Data (${interval}):`, klines);
  } catch (error) {
    console.error("Error fetching kline data:", error.message);
  }
}

// Function to calculate the maximized amount of assets based on USDT in the future account
async function getMaximizedAmount(binance, leverage) {
  try {
    const accountInfo = await binance.fapiPrivateGetAccount();
    const usdtBalance = accountInfo.assets.filter(
      (asset) => asset.asset === "USDT"
    )[0].walletBalance;
    const maxAmount = usdtBalance / leverage;
    console.log("Maximized Amount:", maxAmount);
  } catch (error) {
    console.error("Error calculating maximized amount:", error.message);
  }
}

export default async function fetchPostData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // https://redis.io/docs/connect/clients/nodejs/
  // https://docs.bullmq.io/guide/connections
  // https://github.com/microsoftarchive/redis/releases/tag/win-3.2.100
  if (req.method === "GET") {
    const client = createClient();
    // createClient({
    //   url: 'redis://alice:foobared@awesome.redis.server:6380'
    // });
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();

    await client.set('foo', 'bar');
    const value = await client.get('foo');
    console.log(value); // returns 'bar'
    await client.quit();

    // res.status(200).json({ success: true, data: userSession });
    // const queue = new Queue('Paint');
    // await queue.add(
    //   'test',
    //   { foo: 'bar' },
    //   { removeOnComplete: true, removeOnFail: true },
    // );

    // 1차로 id 및 api secret chatId 검증 -> fail then return false
    // console.log(ccxt.exchanges); // print all available exchanges

    // // Binance API credentials
    // const apiKey = "your_api_key";
    // const secret = "your_api_secret";
    // const symbol = "BTC/USDT";
    // const leverage = 5; // Set your desired leverage

    // // Initialize Binance futures exchange
    // const binance = new ccxt.binance({
    //   apiKey,
    //   secret,
    //   enableRateLimit: true
    // });
    // //
    // getFutureBalance(binance)
    res.status(200).json({ test: "testssssetest" });
    // const { ticker, interval } = req.query;
    // db.query(
    //   `SELECT
    //     ticker,
    //     \`interval\`,
    //     DATE_FORMAT(Open_time, '%Y-%m-%d %H:%i:%s') AS Open_time,
    //     \`Open\`,
    //     High,
    //     Low,
    //     \`Close\`,
    //     Volume
    //   FROM coin_data WHERE ticker = ? AND \`interval\` = ?`,
    //   [ticker, interval],
    //   function (err: any, result: any) {
    //     if (err) {
    //       console.error(err);
    //       res.status(500).json({ error: "Internal Server Error" });
    //     } else {
    //         const data = result.map((val) => {
    //             return({
    //                 x: val.Open_time,
    //                 y: [val.Open, val.High, val.Low, val.Close]
    //             })
    //         })
    //       res.status(200).json({chartData: data, originData: result});
    //     }
    //   }
    // );
  }
}
