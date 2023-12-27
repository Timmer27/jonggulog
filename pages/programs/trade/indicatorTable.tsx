import { PencilIcon, PlusIcon } from "@heroicons/react/24/solid";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Tooltip,
  Input,
  Dialog,
  DialogHeader,
  Checkbox,
  IconButton,
  Select,
  Option
} from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../../../components/dropdown";
import Indicator from "../../../stretegy/strategy";
// import type { Testtest } from "../interfaces/indicator_interface";

const TABLE_HEAD = ["지표명", "", ""];
const INDICATOR_TABLE_HEAD = ["지표명", ""];

// export function IndicatorTable(indicatorData: Testtest[], postSelectedIndicatorHandler) {
export function IndicatorTable({ calculateSignalHandler }) {
  const [open, setOpen] = useState<boolean>(false);

  const rsiRef = useRef<HTMLInputElement[]>([]);
  const rsiSelectRef = useRef<HTMLSelectElement>();
  const smaRef = useRef<HTMLInputElement[] | string[]>([]);
  const smaSelectRef = useRef<HTMLSelectElement>();
  const emaRef = useRef<HTMLInputElement[] | string[]>([]);
  const emaSelectRef = useRef<HTMLSelectElement>();

  const strategy: any = [
    {
      key: 0,
      name: "RSI",
      label: "RSI",
      desc: "RSI",
      values: [rsiRef, rsiSelectRef],
      html: (
        <div className="flex gap-2">
          <div className="w-[100%]">
            <Input
              crossOrigin={{}}
              inputRef={(ref) => (rsiRef.current[0] = ref)}
              color="blue"
              label="rsi"
              type="number"
            />
          </div>
          <div className="self-center w-[10%] min-w-10 ml-2">보다</div>
          <select className="w-[30%]" ref={rsiSelectRef}>
            <option key={"up"} value={"up"}>
              크다 {"<"}
            </option>
            <option key={"down"} value={"down"}>
              작다 {">"}
            </option>
          </select>
        </div>
      ),
      icon: <XMarkIcon className="h-4 w-4" />
    },
    {
      key: 1,
      name: "SMA",
      label: "이동평균선(SMA)",
      desc: "이동평균선(SMA)",
      values: [smaRef, smaSelectRef],
      ref: smaRef,
      html: (
        <div className="flex gap-2">
          <div className="w-[100%]">
            <Input
              crossOrigin={{}}
              inputRef={(ref) => (smaRef.current[0] = ref)}
              color="blue"
              label="이동평균선(SMA)"
              type="number"
            />
          </div>
          <div className="self-center w-[10%] min-w-10 ml-2">보다</div>
          <div className="w-[100%]">
            <Input
              crossOrigin={{}}
              inputRef={(ref) => (smaRef.current[1] = ref)}
              color="blue"
              label="이동평균선(SMA)"
              type="number"
            />
          </div>
          <div className="self-center w-[10%] ml-2">이</div>
          <select className="w-[30%]" ref={smaSelectRef}>
            <option key={"up"} value={"up"}>
              크다 {"<"}
            </option>
            <option key={"down"} value={"down"}>
              작다 {">"}
            </option>
          </select>
        </div>
      ),
      icon: <XMarkIcon className="h-4 w-4" />
    },
    {
      key: 2,
      name: "EMA",
      label: "이동평균선(EMA)",
      desc: "지수이동평균선(EMA)",
      values: [emaRef, emaSelectRef],
      ref: emaRef,
      html: (
        <div className="flex gap-2">
          <div className="w-[100%]">
            <Input
              crossOrigin={{}}
              inputRef={(ref) => (emaRef.current[0] = ref)}
              color="blue"
              label="지수이동평균선(EMA)"
              type="number"
              className="text-[10px]"
            />
          </div>
          <div className="self-center w-[10%] min-w-10 ml-2">보다</div>
          <div className="w-[100%]">
            <Input
              crossOrigin={{}}
              inputRef={(ref) => (emaRef.current[1] = ref)}
              color="blue"
              label="지수이동평균선(EMA)"
              type="number"
            />
          </div>
          <div className="self-center w-[10%] ml-2">이</div>
          <select className="w-[30%]" ref={emaSelectRef}>
            <option key={"up"} value={"up"}>
              크다 {"<"}
            </option>
            <option key={"down"} value={"down"}>
              작다 {">"}
            </option>
          </select>
        </div>
      ),
      icon: <XMarkIcon className="h-4 w-4" />
    }
  ];

  const { fetchRsi, fetchMA } = Indicator();

  const [filteredIndicator, setFilteredIndicator] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState([]);
  const handleOpen = () => setOpen(!open);

  const selectDataHandler = (key: number, listData: Array<any>) => {
    const filteredData = listData.filter((val) => val.key === key);
    setFilteredIndicator(filteredData);
    return filteredData;
  };

  useEffect(() => {
    setFilteredIndicator(strategy);
  }, []);

  return (
    strategy && (
      <div className="flex">
        <Card className="min-w-[20rem] max-w-[20rem] mr-5 mt-4 mb-4 max-h-80 overflow-auto">
          {/* {strategy[1].html} */}
          {/* <Button onClick={() => { console.log(strategy[1].values[1].map((val) => val.value))}}>tests</Button> */}
          <table className="text-left ">
            <thead className="rounded-t-sm">
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    지표명
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  {/* <Dropdown
                    listData={indicators}
                    setFilteredIndicator={setFilteredIndicator}
                    selectDataHandler={selectDataHandler}
                  /> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredIndicator.map(({ key, name, desc, onPrint }, index) => (
                <tr key={key} className="even:bg-blue-gray-50/50">
                  <Tooltip content={desc}>
                    <td className="p-4 w-[90%]">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                  </Tooltip>
                  <td className="p-4">
                    <Button
                      variant="text"
                      onClick={() => {
                        const filtered = filteredIndicator.filter(
                          (val) => val.name === name
                        );
                        const addItem = filtered.map((val) => {
                          return { ...val, key: selectedIndicator.length };
                        });
                        setSelectedIndicator([
                          ...selectedIndicator,
                          ...addItem
                        ]);
                      }}
                    >
                      <PlusIcon className="w-4" />
                    </Button>
                    <div />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="flex w-full m-auto mt-4 mb-4 max-h-80 overflow-auto">
          <Button
            className="w-28 self-end mt-4 mr-2"
            // variant="text"
            onClick={() => {
              const IndicatorValues = selectedIndicator.map((val, idx) => {
                const [name, refValues] = [val.name, val.values];
                const inputValues = refValues[0].current.map(
                  (val) => val.value
                );
                const isEmpty =
                  inputValues.filter((val) => val === "").length > 0
                    ? true
                    : false;
                const selectValues = refValues[1].current.value;
                const values = [...inputValues, ...[selectValues]];
                return { name: `${name}_${idx}`, values: values, isEmpty: isEmpty };
              });
              const isEmpty =
                IndicatorValues.filter((val) => val.isEmpty).length > 0
                  ? true
                  : false;
              if (isEmpty) {
                alert("모든 칸에 값을 입력해주세요");
              } else {
              }
              
              console.log(IndicatorValues);
              calculateSignalHandler(IndicatorValues);
            }}
          >
            차트 적용
          </Button>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedIndicator.map(
                (
                  { key, name, label, desc, values, ref, html, icon },
                  index
                ) => {
                  const isLast = index === strategy.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={label}>
                      <td className={classes}>
                        <div className="flex items-center gap-3 w-full">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold flex w-full items-center gap-2"
                          >
                            <Tooltip content={desc} placement="top-start">
                              <InformationCircleIcon className="w-[18px]" />
                            </Tooltip>
                            {label}
                          </Typography>
                        </div>
                      </td>
                      <td className={`${classes}`}>{html}</td>
                      {/* delete functions */}
                      <td className={classes}>
                        <IconButton
                          variant="text"
                          onClick={(e) => {
                            const filtered = selectedIndicator.filter(
                              (val) => val.key !== key
                            );
                            setSelectedIndicator(filtered);
                          }}
                        >
                          {icon}
                        </IconButton>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      </div>
    )
  );
}
