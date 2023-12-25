import {
  awesomeOscillator,
  stochasticOscillatorStrategy,
  sma,
  ema,
  rsi
} from "indicatorts";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input, Select, Option } from "@material-tailwind/react";
import type { ohlcObj } from "../interfaces/ohlcData_interface";

export const strategies = [
  {
    key: 0,
    name: "RSI",
    desc: "RSI",
    params: (
      <div className="flex gap-2">
        <div className="w-[30%]">
          <Input crossOrigin={{}} color="blue" label="rsi" type="number" />
        </div>
        <div className="self-center w-[20%]">보다</div>
        <div className="w-[30%]">
          <Select
            variant="outlined"
            label="구분"
            onChange={(value) => {
              console.log(value);
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
    icon: XMarkIcon
  },
  {
    key: 1,
    name: "이동평균선(SMA)",
    desc: "이동평균선(SMA)",
    params: (
      <div className="flex gap-2">
        <div className="w-[30%]">
          <Input
            crossOrigin={{}}
            color="blue"
            label="이동평균선(SMA)"
            type="number"
          />
        </div>
        <div className="self-center w-[20%]">보다</div>
        <div className="w-[30%]">
          <Input
            crossOrigin={{}}
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
              console.log(value);
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
    icon: XMarkIcon
  },
  {
    key: 2,
    name: "지수이동평균선(EMA)",
    desc: "지수이동평균선(EMA)",
    params: (
      <div className="flex gap-2">
        <div className="w-[30%]">
          <Input
            crossOrigin={{}}
            color="blue"
            label="지수이동평균선(EMA)"
            type="number"
          />
        </div>
        <div className="self-center w-[20%]">보다</div>
        <div className="w-[30%]">
          <Input
            crossOrigin={{}}
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
              console.log(value);
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
    icon: XMarkIcon
  }
  // {
  //   key: 3,
  //   name: "지표4",
  //   desc: "이러한 지표다",
  //   params: (
  //     <div className="flex gap-2">
  //       <div className="w-[30%]">
  //         <Input crossOrigin={{}} color="blue" label="rsi" type="number" />
  //       </div>
  //     </div>
  //   ),
  //   icon: XMarkIcon
  // },
  // {
  //   key: 3,
  //   name: "지표4",
  //   desc: "이러한 지표다",
  //   params: (
  //     <div className="flex gap-2">
  //       <div className="w-[30%]">
  //         <Input crossOrigin={{}} color="blue" label="rsi" type="number" />
  //       </div>
  //     </div>
  //   ),
  //   icon: XMarkIcon
  // },
  // {
  //   key: 3,
  //   name: "지표4",
  //   desc: "이러한 지표다",
  //   params: (
  //     <div className="flex gap-2">
  //       <div className="w-[30%]">
  //         <Input crossOrigin={{}} color="blue" label="rsi" type="number" />
  //       </div>
  //     </div>
  //   ),
  //   icon: XMarkIcon
  // },
  // {
  //   key: 3,
  //   name: "지표4",
  //   desc: "이러한 지표다",
  //   params: (
  //     <div className="flex gap-2">
  //       <div className="w-[30%]">
  //         <Input crossOrigin={{}} color="blue" label="rsi" type="number" />
  //       </div>
  //     </div>
  //   ),
  //   icon: XMarkIcon
  // },
  // {
  //   key: 3,
  //   name: "지표4",
  //   desc: "이러한 지표다",
  //   params: (
  //     <div className="flex gap-2">
  //       <div className="w-[30%]">
  //         <Input crossOrigin={{}} color="blue" label="rsi" type="number" />
  //       </div>
  //     </div>
  //   ),
  //   icon: XMarkIcon
  // }
];

export const fetchRsi = (data: ohlcObj[], range: number, type: string) => {
  const closings = data?.map((val) => val.Close);
  const dates = data?.map((val) => val.Open_time);
  const rsiData = rsi(closings)
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

export const fetchMA = (
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
