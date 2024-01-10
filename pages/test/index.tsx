import React, { useState, useEffect } from "react";
import * as TechnicalIndicators from "technicalindicators";
import {
  defaultBalance,
  defaultExchangeFee,
  defaultIndicatorPeriod,
  defaultStopLoss,
  defaultTakeProfit,
  orderTypes,
  positionTypes
} from "../../utils/config";
import candles from "../../utils/bitfinex_BTCUSD_15m.json";

// import * as transformCandle from '../../utils/config';

const PositionTypesEnum = {
  LONG: "long",
  SHORT: "short",
  NONE: "none"
};

const OrderTypesEnum = {
  LIMIT: "limit",
  MARKET: "market"
};

const indicators = [
  { name: "rsi", period: 14 },
  { name: "ema", period: 9 },
  { name: "ema", period: 21 },
  {
    name: "stochasticrsi",
    period: 14,
    rsiPeriod: 14,
    stochasticPeriod: 14,
    kPeriod: 3,
    dPeriod: 3
  },
  // {name: 'adx', period: 14},
  { name: "bollingerbands", period: 14, stddev: 2 }
];

const Backtest = ({
  //   candles,
  signals,
  stopLoss,
  takeProfit,
  exchangeFee,
  balanceUSD,
  //   indicators,
  strategy
}) => {
  const [state, setState] = useState({
    balanceUSD: balanceUSD || defaultBalance,
    stopLoss: stopLoss || defaultStopLoss,
    positionEntry: 0,
    takeProfit: takeProfit || defaultTakeProfit,
    positionType: PositionTypesEnum.NONE,
    trades: [],
    maximumBalance: balanceUSD || defaultBalance,
    minimumBalance: balanceUSD || defaultBalance
  });

  const [candleData, setCandleData] = useState(
    candles.map((candle) => {
      const [candleTimestamp, open, close, high, low, volume] = candle;
      return {
        candleTimestamp: candleTimestamp,
        close: close,
        high: high,
        low: low,
        open: open,
        volume: volume
      };
    })
  );

  const [indicatorsData, setIndicatorsData] = useState({});
  const [orders, setOrders] = useState([]);

  const calculateIndicators = () => {
    indicators.forEach((indicator) => {
      const period = indicator.period || defaultIndicatorPeriod;
      const indicatorKey = indicator.name + period;
      const inputCandles = candleData.map((candle) => candle.close);
      const indicatorInput: any = { values: inputCandles, period };

      // 아래는 해당 조건 특수 케이스
      if (indicator.stddev) {
        indicatorInput.stddev = indicator.stddev;
      }
      if (indicator.rsiPeriod && indicator.stochasticPeriod) {
        indicatorInput.rsiPeriod = indicator.rsiPeriod;
        indicatorInput.stochasticPeriod = indicator.stochasticPeriod;
      }

      const calculatedIndicator =
        TechnicalIndicators[indicator.name](indicatorInput);
      const indicatorObj = [
        ...fillBlankIndicatorValues(period),
        ...calculatedIndicator
      ];

      const newCandleData = candleData.map((val, idx) => {
        return({
            ...val,
            [indicatorKey]: indicatorObj[idx]
        })
      })

      console.log("indicatorObj ============>", newCandleData);
      setCandleData((data) => ({
        ...data,
        ...newCandleData
      }));
    });
  };
  const fillBlankIndicatorValues = (period = defaultIndicatorPeriod) =>
    Array(period).fill(0);

  useEffect(() => {
    const cancelFillOrKillOrders = () => {
      setOrders(orders.filter((order) => order.fillOrKill !== true));
    };

    const checkForSignal = (candleIndex, candle) => {
      const { candleTimestamp } = candle;
      return signals[candleTimestamp];
    };

    const checkStopLossAndTakeProfit = (candle) => {
      let isStopLossHit = false;
      let isTakeProfitHit = false;

      console.log("state.positionEntry", state.positionEntry);

      if (state.positionType === PositionTypesEnum.LONG) {
        if (state.positionEntry > candle.low) {
          const difference = state.positionEntry - candle.low;
          const drawdownPercentage = difference / state.positionEntry;

          if (drawdownPercentage >= state.stopLoss) {
            isStopLossHit = true;
          }
        }

        if (state.positionEntry < candle.high) {
          const difference = candle.high - state.positionEntry;
          const profitPercentage = difference / state.positionEntry;

          if (profitPercentage >= state.takeProfit) {
            isTakeProfitHit = true;
          }
        }
      }

      if (state.positionType === PositionTypesEnum.SHORT) {
        if (state.positionEntry < candle.high) {
          const difference = candle.high - state.positionEntry;
          const profitPercentage = difference / state.positionEntry;

          if (profitPercentage >= state.stopLoss) {
            isStopLossHit = true;
          }
        }

        if (state.positionEntry > candle.low) {
          const difference = state.positionEntry - candle.low;
          const drawdownPercentage = difference / state.positionEntry;

          if (drawdownPercentage >= state.takeProfit) {
            isTakeProfitHit = true;
          }
        }
      }

      if (isStopLossHit || isTakeProfitHit) {
        closePosition({ isStopLossHit, isTakeProfitHit });
      }
    };

    const closePosition = ({ isStopLossHit, isTakeProfitHit }) => {
      const trade = {
        type: state.positionType,
        entry: state.positionEntry,
        stopLoss: state.stopLoss,
        takeProfit: state.takeProfit,
        amount: state.balanceUSD < 1000 ? state.balanceUSD : 1000,
        close: 0,
        fee: 0,
        profit: 0
      };

      const isLongPosition = trade.type === PositionTypesEnum.LONG;
      let difference;

      if (isStopLossHit) {
        difference = -(trade.entry * trade.stopLoss);
      } else if (isTakeProfitHit) {
        difference = trade.entry * trade.takeProfit;
      }

      trade.close = isLongPosition
        ? trade.entry + difference
        : trade.entry - difference;
      trade.fee =
        exchangeFee *
        (2 * trade.amount +
          (Math.abs(trade.close - trade.entry) / trade.entry) * trade.amount);
      trade.profit = trade.amount * (difference / trade.entry) - trade.fee;

      setState((prevState) => ({
        ...prevState,
        positionType: PositionTypesEnum.NONE,
        balanceUSD: prevState.balanceUSD + trade.profit,
        trades: [...prevState.trades, trade]
      }));

      handleBalanceStats();
      logState();
    };

    const countTrades = () => {
      const totalTrades = state.trades.length;
      const profitTrades = state.trades.filter((t) => t.profit > 0).length;
      const unprofitTrades = totalTrades - profitTrades;

      setState((prevState) => ({
        ...prevState,
        totalTrades,
        profitTrades,
        unprofitTrades
      }));
    };

    const handleBalanceStats = () => {
      const { balanceUSD, maximumBalance, minimumBalance } = state;

      if (balanceUSD > maximumBalance) {
        setState((prevState) => ({
          ...prevState,
          maximumBalance: balanceUSD
        }));
      }

      if (balanceUSD < minimumBalance) {
        setState((prevState) => ({
          ...prevState,
          minimumBalance: balanceUSD
        }));
      }
    };

    const logState = () => {
      const logState = {
        ...state,
        trades: state.trades.length
      };
      // console.log('new state:', logState);
    };

    const openPosition = (price, positionType = PositionTypesEnum.LONG) => {
      if (state.positionType !== PositionTypesEnum.NONE) {
        return;
      }
      // console.log('new position:', price, positionType);
      setState((prevState) => ({
        ...prevState,
        positionEntry: price,
        positionType
      }));
    };

    const placeOrder = (price, positionType, orderType, fillOrKill) => {
      setOrders((orders) => [
        ...orders,
        {
          price,
          positionType,
          orderType,
          fillOrKill
        }
      ]);
    };

    const processSignals = (candle, indicatorsData) => {
      console.log("candle", candle, "indicatorsData", indicatorsData);
      const { candleTimestamp } = candle;
      //   각 배열이 담겨있는 candle 데이터에 정해진 조건을 달성한 것만 라벨링

      console.log("signals", signals, "candleTimestamp", candleTimestamp);
      const signal = signals[candleTimestamp];
      //   이 signals 배열 구한 것 중ㅈ candleTimestamp 가 존재할 시 이걸 뽑아서 아래 placeOrder 에 넣는 것.
      // 즉 signals 라는 내가 설정한 조건식에서 1이 만족한 것이면 아래 조건 돌리면 되고
      // 1, 0 에 따라 롱 숏 기준 달리해서 구해주면 될듯

      //   public addSignal({ timestamp, price, positionType, orderType }): void {
      //     this.signals[timestamp] = {
      //       price,
      // positionTypes.LONG, long
      // 	orderTypes.LIMIT limit
      //       positionType,
      //       orderType
      //     };
      //   }

      if (signal) {
        const { positionType, price, orderType } = signal;

        if (orderType === orderTypes.MARKET) {
          openPosition(candle.close, positionType);
        } else if (orderType === orderTypes.LIMIT) {
          placeOrder(price, positionType, orderType, true);
        }
      }
    };

    const tryToFillOrders = (candle) => {
      setOrders((orders) =>
        orders.reduce((unexecutedOrders, order) => {
          if (order.price >= candle.low && order.price <= candle.high) {
            openPosition(order.price, order.positionType);
          }
          return unexecutedOrders;
        }, [])
      );
    };

    const start = () => {
      calculateIndicators();

      candleData.forEach((candle, candleIndex) => {
        // console.log('state.positionType', state.positionType)
        if (state.positionType !== PositionTypesEnum.NONE) {
          checkStopLossAndTakeProfit(candle);
        }
        tryToFillOrders(candle);
        cancelFillOrKillOrders();
        // strategy(candleIndex, candle, PositionTypesEnum.NONE, orderTypes);
        // processSignals(candle, indicatorsData[candleIndex]);
      });

      //   countTrades();
    };

    start();
  }, []); // The empty dependency array ensures that this useEffect runs once, similar to componentDidMount
  console.log("candleData 22+++++++++>", candleData);
  // console.log("state", state);

  return <div>{/* JSX for your component goes here */}</div>;
};

export default Backtest;
