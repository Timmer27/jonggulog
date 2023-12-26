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
  IconButton
} from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./dropdown";
import Indicator from "../stretegy/strategy";
// import type { Testtest } from "../interfaces/indicator_interface";

const TABLE_NAV = [
  {
    href: "/indicator.png",
    width: "small",
    height: "blue-gray",
    className: "flex items-center gap-x-2 p-1 font-medium"
  }
];

const TABLE_HEAD = ["지표명", "", ""];
const INDICATOR_TABLE_HEAD = ["지표명", ""];

// export function IndicatorTable(indicatorData: Testtest[], postSelectedIndicatorHandler) {
export function IndicatorTable({ calculateSignalHandler }) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>();

  const { strategy, fetchRsi, fetchMA } = Indicator();

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
            onClick={(val) => {
              {
                console.log(selectedIndicator);
                // calculateSignalHandler();
              }
            }}
          >
            차트 적용
          </Button>
          {/* <CardHeader floated={false} shadow={false} className="rounded-none">
            <ul className="place-content-end mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"></ul>
            <Dialog
              open={open}
              size="xl"
              handler={handleOpen}
              // className={
              //   "overflow-hidden overflow-y-auto min-h-[35rem] max-h-[35rem]"
              // }
            >
              <DialogHeader></DialogHeader>
            </Dialog>
          </CardHeader> */}
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
              {selectedIndicator.map(({ key, name, desc, values, ref, html, icon }, index) => {
                const isLast = index === strategy.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={name}>
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
                          {name}
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
              })}
            </tbody>
          </table>
        </Card>
      </div>
    )
  );
}
