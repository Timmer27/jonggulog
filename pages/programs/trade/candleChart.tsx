import React, { useState, useEffect } from "react";
// import ReactApexChart from 'react-apexcharts';
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Button, Option, Select } from "@material-tailwind/react";

const CandlisticChart = ({
  initialData,
  setInitialData,
  ticker,
  intervals,
  setActiveStep
}) => {
  const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false
  });

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

  const series = initialData?.seriesData;

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
      points: initialData?.annotation
    },
    tooltip: {
      enabled: true
    },
    xaxis: {
      type: "datetime",
      // labels: {
      //   formatter: function (val) {
      //     return "2023-11-16 09:00:00"
      //   }
      // }
      labels: {
        formatter: function (val) {
          return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
        }
      }
    },
    yaxis: initialData?.yaxisOption
  };

  return (
    initialData && (
      <div id="chart">
        
        {ReactApexChart ? (
          <>
            <ReactApexChart
              options={options}
              series={series}
              type="candlestick"
              height={700}
            />
            <div className="flex justify-between mb-12">
              <Button
                variant="outlined"
                onClick={() => {
                  setActiveStep(0);
                }}
              >
                뒤로가기
              </Button>
              <Button
                onClick={() => {
                  setActiveStep(2);
                }}
              >
                조건식 추출하기
              </Button>
            </div>
          </>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    )
  );
};

export default CandlisticChart;
