import { XMarkIcon } from "@heroicons/react/24/solid";
import { Input, Option, Select } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { ohlcObj } from "../interfaces/ohlcData_interface";
import { customRsi, ema, rsi, sma } from "indicatorts";

export default function Indicator() {
 
  const fetchRsi = (data: ohlcObj[], span:number, range: number, type: string) => {
    const closings = data?.map((val) => val.Close);
    // const dates = data?.map((val) => val.Open_time);
    const rsiData = customRsi(span, closings);
    if (type === "higher") {
      const result = rsiData.map((val, idx) => {
        if (val > range) {
          return 1;
        } else {
          return 0;
        }
      });
      return [rsiData, result];
    } else {
      const result = rsiData.map((val, idx) => {
        if (val < range) {
          return 1;
        } else {
          return 0;
        }
      });
      return [rsiData, result];
    }
  };

  const fetchMA = (
    compareData: ohlcObj[],
    range1: number,
    range2: number,
    type: string,
    dataType: string
  ) => {
    const closings1 = compareData?.map((val) => val.Close);
    const closings2 = compareData?.map((val) => val.Close);
    const data1 =
      dataType === "ema" ? ema(range1, closings1) : sma(range1, closings1);
    const data2 =
      dataType === "ema" ? ema(range2, closings2) : sma(range2, closings2);

    if (type === "higher") {
      const result = data2.map((val, idx) => {
        if (val > data1[idx]) {
          return 1;
        } else {
          return 0;
        }
      });
      return [data1, data2, result];
    } else {
      const result = data2.map((val, idx) => {
        if (val < data1[idx]) {
          return 1;
        } else {
          return 0;
        }
      });
      return [data1, data2, result];
    }
  };

  return { fetchRsi, fetchMA };
}
