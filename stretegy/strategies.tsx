import { awesomeOscillator, stochasticOscillatorStrategy, rsi } from "indicatorts";
import type { ohlcObj } from "../interfaces/ohlcData_interface";

export const fetchRsi = (
  data: ohlcObj[],
  range: number,
  type: string
) => {
  const closings = data?.map((val) => val.Close);
  const rsiData = rsi(closings)
  if(type === 'up'){
    const result = rsiData.map((val, idx) => {
        if(val > range){
            return 1
        }else{
            return 0
        }
    })
    return [rsiData, result]
  }else{
    const result = rsiData.map((val, idx) => {
        if(val < range){
            return 1
        }else{
            return 0
        }
    })
    return [rsiData, result]
  }
};

export const fetchClose = (
  data: ohlcObj[],
  range: number,
  type: string
) => {
  const closings = data?.map((val) => val.Close);
  const rsiData = rsi(closings)
  if(type === 'up'){
    const result = rsiData.map((val, idx) => {
        if(val > range){
            return 1
        }else{
            return 0
        }
    })
    return [rsiData, result]
  }else{
    const result = rsiData.map((val, idx) => {
        if(val < range){
            return 1
        }else{
            return 0
        }
    })
    return [rsiData, result]
  }
};
