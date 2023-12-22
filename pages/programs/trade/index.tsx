import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/solid";
import { IndicatorTable } from "../../../components/indicatorTable";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { fetchRsi } from "../../../stretegy/strategies";
// import LineChart from "./test";
const CandleChart = dynamic(() => import("./candleChart"), {
  ssr: false
});

// 참고
// https://apexcharts.com/react-chart-demos/candlestick-charts/category-x-axis/

const Programs = (Props) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("/api/trade/BTCUSDT/1d").then((res) => {
        const result = res.json();
        return result;
      })
      // fetch(`/api/trade/${}/${}`).then((res) => {
      //   const result = res.json();
      //   return result;
      // })
  });

  const selecteTickerIntervalHandler = (selectedData) => {
    console.log('selectedData', selectedData)

  }

  const calculateSignalHandler = () => {
    if (data) {
      const test = data?.originData.slice(0, 100);
      const [rsiData, rsiResult] = fetchRsi(test, 70, "up");

      const adj = test.map((val, idx) => {
        return {
          ...val,
          rsi: rsiData[idx],
          signal: rsiResult[idx]
        };
      });

      // 결국 indicatort table에서 적용을 누르면 
      // setSelectedIndicator에 담은 값으로(함수) 아래 adj를 계산해서 나한테 던져주고
      // 난 아래 실행해서 signal다시 받아서 차트에 넣어주면 됨

      const adjAnnotation = adj
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
      return adjAnnotation;
    }
  };

  const headerData = [
    {
      label: "백테스팅",
      value: "backtest",
      icon: UserCircleIcon,
      // <Image src={'/bot.png'} alt="bot" width={30} height={30} />
      desc: (
        <div className="flex flex-col">
          {!isLoading && (
            <CandleChart
              initialData={data}
              calculateSignalHandler={calculateSignalHandler}
              selecteTickerIntervalHandler={selecteTickerIntervalHandler}
            />
          )}
          <Typography variant="h4" className="mt-4 mb-2">
            backtesting
          </Typography>
          <IndicatorTable />
        </div>
      )
      //   desc: <Description />,
    },
    {
      label: "자동매매 (업데이트 예정)",
      value: "autoTrade",
      icon: Square3Stack3DIcon,
      desc: "test"
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`
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
