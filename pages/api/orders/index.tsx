import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import ccxt from "ccxt";

// const db = require("../../../config/db");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { apiKey, secretKey, symbol, side, quantity, price } = req.body;

  try {
    const exchange = new ccxt.binance({
      apiKey: apiKey,
      secret: secretKey,
      enableRateLimit: true,
      //   verbose: true,
      options: { defaultType: "future" }
    });

    // Set testNet mode
    exchange.setSandboxMode(true);

    const symbol = "BTCUSDT";

    // Set leverage
    exchange.setLeverage(25, symbol);

    // Enable hedge mode
    exchange.setPositionMode(true, symbol); // Enable hedge mode
    await exchange.dapiPrivatePostPositionSideDual({
      dualSidePosition: true
    });

    const ticker = await exchange.fetchTicker(symbol);
    const currentValue = ticker.last;

    console.log("currentValue", currentValue);

    // Create order
    const orderResponse = await exchange.createMarketSellOrder(
      symbol,
      //   "LIMIT",
      //   "BUY",
      0.3,
      //   45000.0,
      { hedged: true, positionSide: "LONG", closePosition: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
