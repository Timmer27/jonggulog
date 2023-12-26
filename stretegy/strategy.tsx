import { XMarkIcon } from "@heroicons/react/24/solid";
import { Input, Option, Select } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { ohlcObj } from "../interfaces/ohlcData_interface";
import { ema, rsi, sma } from "indicatorts";

export default function Indicator() {
  const rsiRef = useRef<HTMLInputElement>();
  const [rsiValue, setRsiValue] = useState("");
  const smaRef = useRef<HTMLInputElement[] | string[]>([]);
  const [smaValue, setSmaValue] = useState("");
  const emaRef = useRef<HTMLInputElement[] | string[]>([]);
  const [emaValue, setEmaValue] = useState("");

  const strategy:any = [
    {
      key: 0,
      name: "RSI",
      desc: "RSI",
      values: [rsiRef?.current, rsiValue],
      html: (
        <div className="flex gap-2">
          <div className="w-[30%]">
            <Input
              crossOrigin={{}}
              inputRef={rsiRef}
              color="blue"
              label="rsi"
              type="number"
            />
          </div>
          <div className="self-center w-[20%]">보다</div>
          <div className="w-[30%]">
            <Select
              variant="outlined"
              label="구분"
              onChange={(value) => {
                setRsiValue(value);
              }}
            >
              <Option key={"up"} value={"up"}>
                크다 {"<"}
              </Option>
              <Option key={"down"} value={"down"}>
                작다 {">"}
              </Option>
            </Select>
          </div>
        </div>
      ),
      icon: <XMarkIcon className="h-4 w-4"/>
    },
    {
      key: 1,
      name: "이동평균선(SMA)",
      desc: "이동평균선(SMA)",
      values: [smaRef.current, smaRef.current, smaValue],
      ref: smaRef,
      html: (
        <div className="flex gap-2">
          <div className="w-[30%]">
            <Input
              crossOrigin={{}}
              inputRef={(ref) => (smaRef.current[0] = ref)}
              color="blue"
              label="이동평균선(SMA)"
              type="number"
            />
          </div>
          <div className="self-center w-[20%]">보다</div>
          <div className="w-[30%]">
            <Input
              crossOrigin={{}}
              inputRef={(ref) => (smaRef.current[1] = ref)}
              color="blue"
              label="이동평균선(SMA)"
              type="number"
            />
          </div>
          <div className="self-center w-[20%]">이</div>
          <div className="w-[30%]">
            <Select
              variant="outlined"
              label="구분"
              onChange={(value) => {
                setSmaValue(value);
              }}
            >
              <Option key={"up"} value={"up"}>
                크다 {"<"}
              </Option>
              <Option key={"down"} value={"down"}>
                작다 {">"}
              </Option>
            </Select>
          </div>
        </div>
      ),
      icon: <XMarkIcon className="h-4 w-4"/>
    },
    {
      key: 2,
      name: "지수이동평균선(EMA)",
      desc: "지수이동평균선(EMA)",
      values: [emaRef.current, emaValue],
      ref: emaRef,
      html: (
        <div className="flex gap-2">
          <div className="w-[30%]">
            <Input
              crossOrigin={{}}
              inputRef={(ref) => (smaRef.current[0] = ref)}
              color="blue"
              label="지수이동평균선(EMA)"
              type="number"
              className="text-[10px]"
            />
          </div>
          <div className="self-center w-[20%]">보다</div>
          <div className="w-[30%]">
            <Input
              crossOrigin={{}}
              inputRef={(ref) => (smaRef.current[1] = ref)}
              color="blue"
              label="지수이동평균선(EMA)"
              type="number"
            />
          </div>
          <div className="self-center w-[20%]">이</div>
          <div className="w-[30%]">
            <Select
              variant="outlined"
              label="구분"
              onChange={(value) => {
                setEmaValue(value);
              }}
            >
              <Option key={"up"} value={"up"}>
                크다 {"<"}
              </Option>
              <Option key={"down"} value={"down"}>
                작다 {">"}
              </Option>
            </Select>
          </div>
        </div>
      ),
      icon: <XMarkIcon className="h-4 w-4"/>
    }
  ];

  const fetchRsi = (data: ohlcObj[], range: number, type: string) => {
    const closings = data?.map((val) => val.Close);
    const dates = data?.map((val) => val.Open_time);
    const rsiData = rsi(closings);
    if (type === "up") {
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
    compareData1: ohlcObj[],
    compareData2: ohlcObj[],
    range1: number,
    range2: number,
    type: string,
    dataType: string
  ) => {
    const closings1 = compareData1?.map((val) => val.Close);
    const closings2 = compareData2?.map((val) => val.Close);
    const data1 =
      dataType === "ema" ? ema(range1, closings1) : sma(range1, closings1);
    const data2 =
      dataType === "ema" ? ema(range2, closings2) : sma(range2, closings2);

    if (type === "up") {
      const result = data1.map((val, idx) => {
        if (val > data2[idx]) {
          return 1;
        } else {
          return 0;
        }
      });
      return [data1, result];
    } else {
      const result = data1.map((val, idx) => {
        if (val < data2[idx]) {
          return 1;
        } else {
          return 0;
        }
      });
      return [data2, result];
    }
  };

  return { strategy, fetchRsi, fetchMA };
}
