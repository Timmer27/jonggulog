import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Card,
  CardBody,
  Stepper,
  Step
} from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import {
  BanknotesIcon,
  BookOpenIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
  DocumentArrowUpIcon
} from "@heroicons/react/24/outline";
import Indicator from "../../../stretegy/strategy";
import {
  BeakerIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import ConditionTable from "./conditionTable";

// import LineChart from "./test";
const CandleChart = dynamic(() => import("./candleChart"), {
  ssr: false
});

// 참고
// https://apexcharts.com/react-chart-demos/candlestick-charts/category-x-axis/

const Programs = (Props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const intervals = ["1d", "8h", "4h", "1h", "30m", "15m", "5m", "1m"];
  const ticker = ["BTCUSDT"];
  const { fetchRsi, fetchMA } = Indicator();

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

  //

  // 차트 적용 함수
  const calculateSignalHandler = (IndicatorValues) => {
    if (data) {
      // 기본 값
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

      const fetchValues = IndicatorValues.reduce((acc, cur, idx) => {
        // const name = cur.name.split('_')[0]
        const name = cur.name;
        if (name.startsWith("RSI")) {
          const [rsiData, rsiResult] = fetchRsi(
            data.originData,
            cur.values[0],
            cur.values[1],
            cur.values[2]
          );
          acc[name] = rsiData;
          acc[`${name}_signal`] = rsiResult;
        } else if (name.startsWith("SMA")) {
          const [smaData, smaResult] = fetchMA(
            data.originData,
            cur.values[0],
            cur.values[1],
            cur.values[2],
            "sma"
          );
          acc[name] = smaData;
          acc[`${name}_signal`] = smaResult;
        } else if (name.startsWith("EMA")) {
          // Handle EMA logic if needed
        }
        return acc;
      }, {});

      // fetchMA
      const indicatorNames = Object.keys(fetchValues);
      // Iterate over each indicator name
      indicatorNames.forEach((indicatorName) => {
        const indicatorData = fetchValues[indicatorName]; // Assuming each indicator's data is stored in fetchValues

        // Update data.originData with the indicator data
        data.originData.forEach((val, idx) => {
          val[indicatorName] = indicatorData[idx];
        });
      });

      // 모든 signal 이 1일때
      data.originData.forEach((obj) => {
        const allSignalsEqualToOne = Object.keys(obj)
          .filter((key) => key.endsWith("_signal"))
          .every((key) => obj[key] === 1);

        const allSignalsEqualToZero = Object.keys(obj)
          .filter((key) => key.endsWith("_signal"))
          .every((key) => obj[key] === 0);

        obj.signal = allSignalsEqualToOne ? 1 : allSignalsEqualToZero ? 0 : -1;
      });

      // console.log("fetchValues", fetchValues, Object.keys(fetchValues));
      // 결국 indicatort table에서 적용을 누르면
      // setSelectedIndicator에 담은 값으로(함수) 아래 adj를 계산해서 나한테 던져주고
      // 난 아래 실행해서 signal다시 받아서 차트에 넣어주면 됨
      // 차트 series + option 값 지정해서 넣어주기

      // 해당 함수를 array로 갖고와서 넣어준다는 임시 가정
      const tmpAdj = data.originData.slice(
        data.originData.length - 100,
        data.originData.length
      );

      // const selectedTechs = ["rsi"];
      // const seriesNames = Object.keys(data.originData[0]).filter((key) => key !== 'signal')
      // console.log(Object.keys(data.originData[0]), data.originData, seriesNames);
      indicatorNames.map((val, idx) => {
        if (!val.endsWith("signal")) {
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
        }
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

      console.log("adjAnnotation", adjAnnotation);

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
      label: "프로그램 설치하기",
      value: "download",
      icon: BeakerIcon,
      desc: (
        <div>
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h4" className="pb-3">
                1. 아래 파일 다운받기
              </Typography>
              <li>
                <a
                  target="_blank"
                  className="text-blue-700 font-bold underline"
                  href="https://drive.google.com/file/d/19yDOOouLyyTJzK7GK-49moFUSV3K-Vdi/view?usp=sharing"
                  rel="noopener noreferrer"
                >
                  다운로드 링크
                </a>
              </li>
              {/* <Typography variant="lead">asdsa</Typography> */}
            </CardBody>
          </Card>
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h4" className="pb-3">
                2. 파일 압축 해제하기
              </Typography>
              <p>
                해당{" "}
                <a
                  target="_blank"
                  className="text-blue-700 font-bold underline"
                  href="https://blog.naver.com/eerony/223281891412"
                  rel="noopener noreferrer"
                >
                  네이버 블로그
                </a>
                에 기재되어있는 설명서를 통해 자동매매 세팅하기
              </p>
              {/* <Typography variant="lead">asdsa</Typography> */}
            </CardBody>
          </Card>
          <Card className="mt-3 mb-3">
            <CardBody>
              <Typography variant="h4" className="pb-3">
                3. 프로그램 버그 제보 및 보완 아이디어
              </Typography>
              <p>
                <a
                  className="text-blue-700 font-bold underline"
                  href="/contact"
                >
                  여기
                </a>
                {"<- "}로 문의주세요~
              </p>
              {/* <Typography variant="lead">asdsa</Typography> */}
            </CardBody>
          </Card>
        </div>
      )
    },
    {
      label: "백테스팅",
      value: "backtest",
      icon: BanknotesIcon,
      // <Image src={'/bot.png'} alt="bot" width={30} height={30} />
      desc: (
        // 나중에 stepper 추가하기
        // https://www.material-tailwind.com/docs/html/stepper
        <div className="flex flex-col">
          <Stepper
            activeStep={activeStep}
            className="mb-6 w-[80%] flex mx-auto"
          >
            <Step onClick={() => setActiveStep(0)}>
              <div className="absolute -bottom-[1.5rem] w-max text-center">
                <div className="text-sm text-black">조건식 추가</div>
              </div>
              <CogIcon className="h-5 w-5" />
            </Step>
            <Step onClick={() => setActiveStep(1)}>
              <CalculatorIcon className="h-5 w-5" />
              <div className="absolute -bottom-[1.5rem] w-max text-center">
                <div className="text-sm text-black">백테스팅</div>
              </div>
            </Step>
            <Step onClick={() => setActiveStep(2)}>
              <DocumentArrowUpIcon className="h-5 w-5" />
              <div className="absolute -bottom-[1.5rem] w-max text-center">
                <div className="text-sm text-black">자동매매 조건식 추출</div>
              </div>
            </Step>
          </Stepper>

          {!isLoading && activeStep === 1 && (
            <CandleChart
              initialData={initialData}
              setInitialData={setInitialData}
              ticker={ticker}
              intervals={intervals}
            />
          )}
          {activeStep === 0 && (
            <>
              <Typography variant="h5" className="mt-4 mb-4">
                조건식 추가하기
              </Typography>
              <ConditionTable />
            </>
          )}
          {/* <IndicatorTable calculateSignalHandler={calculateSignalHandler} /> */}
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
      value="download"
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
