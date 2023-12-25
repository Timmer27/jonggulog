import React, { useState, useEffect } from "react";
// import ReactApexChart from 'react-apexcharts';
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { dummy } from "../../../data/dummy";
import { Button, Option, Select } from "@material-tailwind/react";

const CandlisticChart = ({
  initialData,
  setInitialData,
  ticker,
  intervals,
  calculateSignalHandler
}) => {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false
  });

  // const intervals = ["1d", "8h", "4h", "1h", "30m", "15m", "5m", "1m"];
  // const ticker = ["BTCUSDT"];

  // const [selectedData, setSelectedData] = useState({
  //   ticker: ticker[0],
  //   interval: intervals[0]
  // });

  const seriesBar = [
    {
      name: "volume"
      // data: seriesDataLinear
    }
  ];

  const optionsBar: any = {
    chart: {
      height: 160,
      type: "bar",
      brush: {
        enabled: true,
        target: "candles"
      },
      selection: {
        enabled: true,
        xaxis: {
          min: new Date("20 Jan 2017").getTime(),
          max: new Date("10 Dec 2017").getTime()
        },
        fill: {
          color: "#ccc",
          opacity: 0.4
        },
        stroke: {
          color: "#0D47A1"
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: "80%",
        colors: {
          ranges: [
            {
              from: -1000,
              to: 0,
              color: "#F15B46"
            },
            {
              from: 1,
              to: 10000,
              color: "#FEB019"
            }
          ]
        }
      }
    },
    stroke: {
      width: 0
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        offsetX: 13
      }
    },
    yaxis: [
      {
        // labels: {
        //   show: false
        // }
        title: {
          text: "Website Blog"
        }
      },
      {
        opposite: true,
        title: {
          text: "Social Media"
        }
      }
    ]
  };
  // const series = [...initialData?.seriesData, ...[{
  //     name: "candle",
  //     type: "candlestick",
  //     data: initialData?.seriesData[0].data
  //     .slice(0, 100)
  //   }]]
  const series = initialData?.seriesData;
  // const series = {
  //   name: "candle",
  //   type: "candlestick",
  //   data: initialData?.originData.slice(0, 100)
  // }
  const options: any = {
    chart: {
      height: 700,
      type: "candlestick"
    },
    legend: {
      // show: true,
      // showForSingleSeries: false,
      position: "top"
      // horizontalAlign: "left",
      // customLegendItems: ["Product A", "Product B"]
    },
    title: {
      text: "백테스팅 차트",
      align: "left"
    },
    annotations: {
      points: initialData?.adjAnnotation
    },
    tooltip: {
      enabled: true
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (val) {
          return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
        }
      }
    },
    yaxis: initialData?.yaxisOption
  };

  // useEffect(() => {
  //   selecteTickerIntervalHandler(selectedData);
  // }, [selectedData]);

  return (
    initialData && (
      <div id="chart">
        <Button
          onClick={() => {
            const result = calculateSignalHandler();
            console.log("result", result);
          }}
        >
          적용 테스트
        </Button>
        <div className="flex w-full gap-3 ml-3 mb-4 mt-2">
          <div>
            <Select
              variant="outlined"
              label="ticker"
              value={initialData.ticker}
              onChange={(value) => {
                setInitialData((prevState) => ({
                  ...prevState,
                  ticker: ticker
                }));
              }}
            >
              {/*  */}
              {ticker.map((val, idx) => {
                return (
                  <Option key={val} value={val}>
                    {val}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div>
            <Select
              variant="outlined"
              label="interval"
              value={initialData.interval}
              onChange={(value) => {
                setInitialData((prevState) => ({
                  ...prevState,
                  interval: value
                }));
              }}
            >
              {/*  */}
              {intervals.map((val, idx) => {
                return (
                  <Option key={val} value={val}>
                    {val}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
        {ReactApexChart ? (
          <ReactApexChart
            options={options}
            series={series}
            type="candlestick"
            height={700}
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    )
  );
};

export default CandlisticChart;
