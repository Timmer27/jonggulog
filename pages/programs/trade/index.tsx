import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography
} from "@material-tailwind/react";
import { IndicatorTable } from "../../../components/indicatorTable";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { dummy } from "../../../data/dummy";
import {
  BanknotesIcon,
  BookOpenIcon,
  CurrencyDollarIcon
} from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import Indicator from "../../../stretegy/strategy";

// import LineChart from "./test";
const CandleChart = dynamic(() => import("./candleChart"), {
  ssr: false
});

// 참고
// https://apexcharts.com/react-chart-demos/candlestick-charts/category-x-axis/

const Programs = (Props) => {
  const intervals = ["1d", "8h", "4h", "1h", "30m", "15m", "5m", "1m"];
  const ticker = ["BTCUSDT"];
  const {fetchRsi} = Indicator()

  const [initialData, setInitialData] = useState({
    ticker: ticker[0],
    interval: intervals[0],
    seriesData: [],
    yaxisOption: [],
    adjAnnotation: []
  });

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    // staleTime: 15000,
    retry: 5,
    // retryDelay: (attemptIndex) => Math.min(attemptIndex * 1000, 1500),
    queryFn: () =>
      fetch(`/api/trade/${initialData.ticker}/${initialData.interval}`).then(
        (res) => {
          const result = res.json();
          return result;
        }
      )
  });

  useEffect(() => {
    refetch();
  }, [initialData.ticker, initialData.interval, refetch]);

  useEffect(() => {
    if (data) {
      const chartData = data?.chartData.slice(
        data?.chartData.length - 100,
        data?.chartData.length
      );
      // const chartData = data?.chartData
      let yaxisOption = [
        {
          // show: false,
          seriesName: "candle",
          min: (min) => {
            const result = chartData.reduce((acc, cur, idx) => {
              const minValue = Math.min(...cur.y);
              if (acc === 0 || acc > minValue) {
                acc = minValue;
              }
              return acc;
            }, 0);
            return result;
          },
          max: (max) => {
            const result = chartData.reduce((acc, cur, idx) => {
              const minValue = Math.max(...cur.y);
              if (acc === 0 || acc < minValue) {
                acc = minValue;
              }
              return acc;
            }, 0);
            return result;
          }
        }
      ];

      let seriesData = [
        {
          name: "candle",
          type: "candlestick",
          data: chartData
        }
      ];

      setInitialData((prevState) => ({
        ...prevState,
        seriesData: seriesData,
        yaxisOption: yaxisOption
      }));
    }
  }, [data]);

  const calculateSignalHandler = () => {
    if (data) {
      const chartData = data?.chartData.slice(
        data?.chartData.length - 100,
        data?.chartData.length
      );
      // const chartData = data?.chartData
      let seriesData = [
        {
          name: "candle",
          type: "candlestick",
          data: chartData
        }
      ];
      let yaxisOption = [
        {
          // show: false,
          seriesName: "candle",
          min: (min) => {
            const result = chartData.reduce((acc, cur, idx) => {
              const minValue = Math.min(...cur.y);
              if (acc === 0 || acc > minValue) {
                acc = minValue;
              }
              return acc;
            }, 0);
            return result;
          },
          max: (max) => {
            const result = chartData.reduce((acc, cur, idx) => {
              const minValue = Math.max(...cur.y);
              if (acc === 0 || acc < minValue) {
                acc = minValue;
              }
              return acc;
            }, 0);
            return result;
          }
        }
      ];
      // fetchMA
      const [rsiData, rsiResult] = fetchRsi(data.originData, 70, "up");

      const adj = data.originData.map((val, idx) => {
        return {
          ...val,
          rsi: rsiData[idx],
          signal: rsiResult[idx]
        };
      });

      // 결국 indicatort table에서 적용을 누르면
      // setSelectedIndicator에 담은 값으로(함수) 아래 adj를 계산해서 나한테 던져주고
      // 난 아래 실행해서 signal다시 받아서 차트에 넣어주면 됨
      // 차트 series + option 값 지정해서 넣어주기

      // 해당 함수를 array로 갖고와서 넣어준다는 임시 가정
      const tmpAdj = adj.slice(adj.length - 100, adj.length);

      const selectedTechs = ["rsi"];
      selectedTechs.map((val, idx) => {
        const tmpSeries = {
          name: val,
          type: "line",
          data: tmpAdj.map((ele) =>
            !ele[`${val}`]
              ? { x: ele.Open_time, y: 1 }
              : { x: ele.Open_time, y: ele[`${val}`] }
          )
        };

        const tmpAxis: any = {
          opposite: true,
          show: false,
          title: {
            text: val
          },
          seriesName: val
          // min: (min) => {
          //   const result = tmpAdj.reduce((acc, cur, idx) => {
          //     const minValue = Math.min(cur.y);
          //     if (acc === 0 || acc > minValue) {
          //       acc = minValue;
          //     }
          //     return acc;
          //   }, 0);
          //   return result;
          // },
          // max: (max) => {
          //   const result = tmpAdj.reduce((acc, cur, idx) => {
          //     const minValue = Math.max(cur.y);
          //     if (acc === 0 || acc < minValue) {
          //       acc = minValue;
          //     }
          //     return acc;
          //   }, 0);
          //   return result;
          // }
        };
        yaxisOption.push(tmpAxis);
        seriesData.push(tmpSeries);
      });

      const adjAnnotation = tmpAdj
        .filter((val) => val.signal !== -1)
        .map((val, idx) => {
          return {
            x: val.Open_time,
            y: val.signal === 1 ? val.Low : val.High,
            marker: {
              size: 4,
              fillColor: "white",
              strokeColor: val.signal === 1 ? "#FF4560" : "#3033FF",
              radius: 2,
              cssClass: "apexcharts-custom-class"
            },
            label: {
              borderColor: val.signal === 1 ? "#FF4560" : "#3033FF",
              offsetY: 0,
              style: {
                color: "#fff",
                background: val.signal === 1 ? "#FF4560" : "#3033FF"
              },
              text: val.signal === 1 ? "LONG" : "SHORT"
            }
          };
        });

      setInitialData((prevState) => ({
        ...prevState,
        seriesData: seriesData,
        yaxisOption: yaxisOption,
        annotation: adjAnnotation
      }));

      return {
        seriesData: seriesData,
        yaxisOption: yaxisOption,
        annotation: adjAnnotation
        // annotation: []
      };
    }
  };
  const headerData = [
    {
      label: "백테스팅",
      value: "backtest",
      icon: BanknotesIcon,
      // <Image src={'/bot.png'} alt="bot" width={30} height={30} />
      desc: (
        <div className="flex flex-col">
          {!isLoading && (
            <CandleChart
              initialData={initialData}
              setInitialData={setInitialData}
              ticker={ticker}
              intervals={intervals}
            />
          )}
          <hr />
          <Typography variant="h4" className="mt-4 mb-2">
            조건식 추가하기
          </Typography>
          <IndicatorTable calculateSignalHandler={calculateSignalHandler} />
        </div>
      )
      //   desc: <Description />,
    },
    {
      label: "자동매매 (업데이트 예정)",
      value: "autoTrade",
      icon: CurrencyDollarIcon,
      desc: "업데이트 예정"
    },
    {
      label: "관리자 실제 투자 기록",
      value: "history",
      icon: BookOpenIcon,
      desc: "업데이트 예정"
    }
  ];
  return (
    <Tabs
      value="backtest"
      orientation="vertical"
      className="w-[95%] m-auto mt-12"
    >
      <TabsHeader className="w-64">
        {headerData.map(({ label, value, icon }) => (
          <Tab key={value} value={value} className="justify-start">
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {headerData.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="py-0">
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default Programs;
