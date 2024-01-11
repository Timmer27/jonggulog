import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const TradingComponent = () => {
  const [apiKey, setApiKey] = useState(
    "c49a347c134c9c40972e1634a560604c778f7ef61bac4dcd54f9464a746a97c0"
  );
  const [secretKey, setSecretKey] = useState(
    "adb46a0f3f2eff0f3e6eb0d11d9545063e285fe2986bbe294ab8c3d5852ad157"
  );
  const [isTrading, setIsTrading] = useState(false);

  useEffect(() => {
    const tradeLoop = async () => {
      while (isTrading) {
        console.log("sleep");
        try {
          console.log("api", apiKey, "secret", secretKey);
          const response = await axios.post("/api/orders", {
            apiKey,
            secretKey
            // symbol,
            // side,
            // quantity,
            // price,
          });

          console.log("response", response);
        } catch (error) {
          console.error("Error during trading:", error);
        }
        // Do something here if needed
        await sleep(1000);
      }
    };
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    tradeLoop();
  }, [isTrading]);
  const handleTradeButtonClick = async () => {
    setIsTrading(true);
  };

  const order = async () => {
    const response = await axios.post("/api/orders", {
      apiKey,
      secretKey
      // symbol,
      // side,
      // quantity,
      // price,
    });
  };
  return (
    <div className="mt-64">
      <Button className="ml-20" onClick={order}>
        order
      </Button>
      <Button className="ml-20" onClick={handleTradeButtonClick}>
        start
      </Button>
      <Button className="ml-20" onClick={() => window.location.reload()}>
        stop
      </Button>
    </div>
  );
};

export default TradingComponent;
