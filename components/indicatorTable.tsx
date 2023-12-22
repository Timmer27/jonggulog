import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
import { useEffect, useState } from "react";
import Dropdown from "./dropdown";
// import type { Testtest } from "../interfaces/indicator_interface";

const TABLE_NAV = [
  {
    href: "/indicator.png",
    width: "small",
    height: "blue-gray",
    className: "flex items-center gap-x-2 p-1 font-medium"
  }
];

const TABLE_HEAD = ["지표명", "", "", ""];
const MODAL_TABLE_HEAD = ["지표명", "", ""];

// export function IndicatorTable(indicatorData: Testtest[], postSelectedIndicatorHandler) {
export function IndicatorTable() {
  const [open, setOpen] = useState<boolean>(false);
  const [indicators, setIndicators] = useState([
    {
      key: 0,
      name: "지표1",
      desc: "이러한 지표다",
      params: (
        <div>
          <Input crossOrigin={{}} color="blue" label="ema" />
          <Input crossOrigin={{}} color="blue" label="ema" />
        </div>
      ),
      icon: XMarkIcon
    },
    {
      key: 1,
      name: "지표2",
      desc: "이러한 지표다",
      params: <Input crossOrigin={{}} color="blue" label="ema" />,
      icon: XMarkIcon
    },
    {
      key: 2,
      name: "지표3",
      desc: "이러한 지표다",
      params: <Input crossOrigin={{}} color="blue" label="ema" />,
      icon: XMarkIcon
    },
    {
      key: 3,
      name: "지표4",
      desc: "이러한 지표다",
      params: <Input crossOrigin={{}} color="blue" label="ema" />,
      icon: XMarkIcon
    }
  ]);
  const [filteredIndicator, setFilteredIndicator] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState([]);
  const handleOpen = () => setOpen(!open);

  const selectDataHandler = (key: number, listData: Array<any>) => {
    const filteredData = listData.filter((val) => val.key === key);
    console.log("filteredData", filteredData);
    setFilteredIndicator(filteredData);
    return filteredData;
  };

  useEffect(() => {
    setFilteredIndicator(indicators);
  }, []);

  return (
    indicators && (
      <Card className="flex w-full m-auto mt-4 mb-4">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {TABLE_NAV.map((val) => {
              return (
                <div
                  onClick={handleOpen}
                  className="flex items-center cursor-pointer"
                >
                  <Image
                    src={val.href}
                    alt=""
                    width={20}
                    height={20}
                    title="지표 추가"
                  />
                  <span className="text-sm pl-2">지표 추가</span>
                </div>
              );
            })}
            <Button variant="text">적용</Button>
          </ul>
          <Dialog open={open} size="xl" handler={handleOpen}>
            <DialogHeader>
              <Dropdown
                listData={indicators}
                setFilteredIndicator={setFilteredIndicator}
                selectDataHandler={selectDataHandler}
              />
            </DialogHeader>
            <Card className="h-full w-full max-h-[35rem]">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {MODAL_TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                  {filteredIndicator.map(
                    ({ key, name, desc, isChecked }, index) => (
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
                          <Checkbox
                            color="blue"
                            defaultChecked={selectedIndicator
                              .map((val) => val.key)
                              .includes(key)}
                            onChange={(e) => {
                              const status = e.currentTarget.checked;
                              if (status) {
                                const filtered = filteredIndicator.filter(
                                  (val) => val.key === key
                                );
                                setSelectedIndicator([
                                  ...selectedIndicator,
                                  ...filtered
                                ]);
                              } else {
                                const filtered = selectedIndicator.filter(
                                  (val) => val.key !== key
                                );
                                setSelectedIndicator(filtered);
                              }
                            }}
                            crossOrigin={{}}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </Card>
          </Dialog>
        </CardHeader>
        <CardBody className="overflow-y-scroll px-0 min-h-48">
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
              {selectedIndicator.map(({ key, name, desc, params }, index) => {
                const isLast = index === indicators.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {desc}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {params}
                      {/* <Tooltip content="Edit User">
                      </Tooltip> */}
                    </td>
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
                        <XMarkIcon className="h-4 w-4" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    )
  );
}
