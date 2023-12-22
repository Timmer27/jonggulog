import React, { useState, useEffect } from "react";
// import ReactApexChart from 'react-apexcharts';
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { dummy } from "../../../data/dummy";
import { Button, Option, Select } from "@material-tailwind/react";

const CandlisticChart = ({
  ticker,
  interval,
  initialData,
  calculateSignalHandler
}) => {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false
  });
  const [annotation, setAnnotation] = useState();
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
    yaxis: {
      labels: {
        show: false
      }
    }
  };

  const options: any = {
    chart: {
      height: 700,
      type: "candlestick",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          // reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        }
      },
      offsetX: 3
      // events: {
      //   mouseMove: function (event, chartContext, config) {
      //     console.log("mouseMove mouseMove", event, chartContext, config);
      //   },
      //   scrolled: function (chartContext, config) {
      //     console.log("Chart scrolled", chartContext, config);
      //   },
      //   brushScrolled: function (chartContext, config) {
      //     console.log("brushScrolled scrolled", chartContext, config);
      //   }
      // }
    },
    zoom: {
      enabled: true,
      type: "xy", // Enable zooming in both x and y directions
      autoScaleYaxis: true // Automatically scale the y-axis when zooming
    },
    title: {
      text: "CandleStick Chart - Category X-axis",
      align: "left"
    },
    annotations: {
      points: annotation
    },
    tooltip: {
      enabled: true
    },
    xaxis: {
      type: "category",
      labels: {
        formatter: function (val) {
          return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  const series = [
    {
      data: !initialData ? dummy : initialData?.chartData.slice(0, 100)
    }
  ];

  return (
    <div id="chart">
      <Button
        onClick={() => {
          const result = calculateSignalHandler();
          setAnnotation(result);
        }}
      >
        적용 테스트
      </Button>
      <div className="flex w-full gap-3 ml-3 mb-4 mt-2">
        <div>
          <Select variant="outlined" label="ticker" value={ticker[0]}>
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
          <Select variant="outlined" label="interval" value={interval[0]}>
            {interval.map((val, idx) => {
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
  );
};

export default CandlisticChart;
