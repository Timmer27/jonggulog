import pandas as pd
import numpy as np
import FinanceDataReader as fdr
import talib
from datetime import timedelta, datetime
import requests
import time
import pickle
from warnings import filterwarnings
from pykrx import stock
import subprocess
import pandas_ta as ta
filterwarnings('ignore')

# bot.sendMessage(chat_id, 'test')
df_origin = pd.DataFrame()
df_origin = fdr.StockListing('KRX')
df_origin = df_origin[df_origin['Market'] != 'KONEX']
t = datetime.now()

tillDate = t + timedelta(days=-230)
tillDate = tillDate.strftime("%Y-%m-%d")
fin_df = pd.DataFrame()
for index, row in df_origin[['Name', 'Code']].iterrows():
    name, symbol = row['Name'], row['Code']
    # , '2022-05-01', '2022-11-10'
    try:
        df = fdr.DataReader(symbol, tillDate)

        df['symbol'] = symbol
        df['date'] = df['Open'].index

        df.ta.ema(append=True, length=112, col_name='112')
        # print(df)
        df['112_diff'] = ((df['Close'] - df['EMA_112']) / df['EMA_112']) * 100
        df['tradeMoney'] = df['Close'] * df['Volume']
        df.ta.sma(append=True, length=60, col_name='60')
        df.ta.sma(append=True, length=20, col_name='20')
        df.ta.sma(append=True, length=5, col_name='5')
        # print(df)
        df['MADiff'] = (df['SMA_20'] - df['SMA_5']) / df['SMA_5'] * 100
        df['6020Diff'] = (df['SMA_60'] - df['SMA_20']) / df['SMA_20'] * 100
        df['Close_diff'] = (df['Close'] - df['Open']) / df['Open'] * 100
        df['lg'] = (df['High'] - df['Close']) / df['Close'] * 100
        df['sh'] = (df['Open'] - df['Low']) / df['Low'] * 100
        df['idx'] = range(len(df['Close']))
        df['Name'] = name

        # 1차 필터링
        tmp = df[(df['Close_diff'] <= 5) & (df['Close_diff'] > 0) & (df['SMA_20'] >= df['Close']) & (df['SMA_5'] <= df['Open']) & (
            df['lg'] <= 2) & (df['sh'] <= 2) & (df['MADiff'] <= 5) & (df['Close'] > 1000)]

        fin_df = pd.concat([fin_df, tmp], axis=0)
    except Exception as e:
        print(e)
        continue

start_nums = 0
max_list = ['0'] * start_nums
low_list = ['0'] * start_nums
tmp_df = pd.DataFrame()
for i in range(start_nums, len(fin_df['Close'])):
    tmp = fdr.DataReader(fin_df['symbol'].iloc[i])
    tmp['date'] = tmp['Open'].index
    tmp['idx'] = [i for i in range(len(tmp['Close']))]
    idx = tmp[tmp['date'] == fin_df['date'].iloc[i]]['idx'].iloc[0]

    prev_df = tmp.iloc[:idx]

    # 여기서 손익가/손절가 파악
    # 손절가/손익가 = min max 최대 15봉
    # fixed_income = tmp['High']
    max_income = max(prev_df['High'].iloc[-25:])
    low_stop = min(prev_df['Low'].iloc[-10:])
    max_list.append(max_income)
    low_list.append(low_stop)

fin_df['max'] = max_list
fin_df['min'] = low_list

fin_df['max'] = fin_df['max'].apply(lambda x: int(x))
fin_df['min'] = fin_df['min'].apply(lambda x: int(x))
fin_df['maxPct'] = round(
    (fin_df['max'] - fin_df['Close']) / fin_df['Close'] * 100, 2)
fin_df['minPct'] = round(
    (fin_df['min'] - fin_df['Close']) / fin_df['Close'] * 100, 2)

# # 지수 조건 추가 5 > 10 상승 조건일 때만
# trends = []
# for i in range(len(fin_df['Close'])):
#     trend = kospi[kospi['date'] == fin_df['date'].iloc[i]]

#     if len(trend) < 1:
#         trends.append('하락')
#         continue
#     trends.append(trend['trend'].iloc[0])
# fin_df['trend'] = trends

# 2차 필터링
fin_df = fin_df[(fin_df['MADiff'] < 5) & (fin_df['6020Diff'] > 0) & (fin_df['Close'] < 30000) & (
    fin_df['6020Diff'] > 5) & (fin_df['tradeMoney'] > 10000000) & (fin_df['maxPct'] >= 5)]
fin_df = fin_df.sort_values('date', ascending=False)


# 1차 기관 외국인 수급 60일치 잡아오고
merge_df = pd.DataFrame()
for i in range(len(fin_df['Close'])):
    date1 = date1 = (
        fin_df['date'].iloc[i] + timedelta(days=-60)).strftime('%Y%m%d')
    date2 = fin_df['date'].iloc[i].strftime(
        '%Y%m%d').replace('-', '')
    symbol = fin_df['symbol'].iloc[i]

    url = f"https://open.shinhansec.com/goodicyber/mk/1206.jsp?date1={date1}&date2={date2}&TrKey=I&code={symbol}"
    dfs = pd.read_html(url, skiprows=[0, 1, 3])
    time.sleep(0.3)

    tmpMerge = dfs[1]
    tmpMerge.dropna(inplace=True)
    # DataFrame 컬러명 수정
    tmpMerge.columns = ['DATE', 'INDIVIDUAL', 'FOREIGN', 'INST', 'FINC_INST',
                        'IVST_INST', 'BANK', 'FINC_IVST', 'ISRNC', 'FINC_ETC', 'INST_ETC']
    tmpMerge.drop('DATE', axis=1, inplace=True)
    merge_df = pd.concat(
        [merge_df, pd.DataFrame(tmpMerge.sum()).T], axis=0)
    # df = df.join(merge_df, lsuffix='_caller', rsuffix='_other')

fin_df.reset_index(drop='index', inplace=True)
merge_df.reset_index(drop='index', inplace=True)
df = fin_df.join(
    merge_df, lsuffix='_caller', rsuffix='_other')

# 추가적 지표 구하기
# #1. 60일 거래량 누적합, 주가 & 거래 일자별로 나눈 값 = 해당 기간동안 거래된 주식 총 수
df['tradeAccured'] = 0
# df['ichimoku'] = 0
df['bollingerUpper'] = 0
df['bollingerLower'] = 0
df['macdTrend'] = 0
df['rsi'] = 0
df['close112Diff'] = 0
df['AROsc'] = 0
df['willr'] = 0
df['mfi'] = 0
df['beta'] = 0
df['corr'] = 0

kospi = stock.get_index_ohlcv_by_date(
    "19800104", "20221226", '1001')
kospi.columns = ['Open', 'High', 'Low', 'Close',
                    'Volume', 'tradeMoney', 'stockCapital']

for i in range(len(df['Close'])):
    date1 = (df['date'].iloc[i] +
                timedelta(days=-600)).strftime('%Y%m%d')
    # date2 = df['date'].iloc[i].replace('-', '')
    #date2 = datetime.strptime(df['date'].iloc[i], '%Y-%m-%d')
    date2 = df['date'].iloc[i].strftime('%Y%m%d')
    code = df['symbol'].iloc[i]

    tmp = fdr.DataReader(code, date1, date2)
    tradeTmp = tmp.iloc[-60:]
    kospiTmp = kospi[kospi.index < df['date'].iloc[i]]

    # trade 60일 누적합
    tradeDays = len(tradeTmp)
    tradeTmp['tradeMoney'] = (tradeTmp['Volume'] * tradeTmp['Close'])
    tradeAccured = tradeTmp['tradeMoney'].sum() / tradeDays
    df.at[i, 'tradeAccured'] = tradeAccured

    # rsi 수치
    df.at[i, 'rsi'] = ta.rsi(tmp['Close'], 14)[-1]

    # macd 주가 비율 수치
    macd, _, _ = ta.macd(tmp['Close'], fast=12, slow=26, signal=9)
    df.at[i, 'macdTrend'] = (macd[-1] / tmp['Close'].iloc[-1] * 100)

    # bollinger 수치
    upper, _, lower = ta.bbands(tmp['Close'], length=11)
    df.at[i, 'bollingerUpper'] = ((upper[-1] - tmp['Close'].iloc[-1]) / tmp['Close'].iloc[-1] * 100)
    df.at[i, 'bollingerLower'] = ((lower[-1] - tmp['Close'].iloc[-1]) / tmp['Close'].iloc[-1] * 100)

    # close112Diff 수치
    df.at[i, 'close112Diff'] = ((ta.sma(tmp['Close'], 112)[-1] - tmp['Close'].iloc[-1]) / tmp['Close'].iloc[-1] * 100)

    # AROON OSC
    AROsc = ta.aroonosc(tmp['High'], tmp['Low'], length=60)
    df.at[i, 'AROsc'] = AROsc[-1]

    # WILLIAM
    willr = ta.willr(tmp['High'], tmp['Low'], tmp['Close'], length=14)
    df.at[i, 'willr'] = willr[-1]

    # MFI로 과매도 구간 RSI 접목시켜 재확인
    mfi = ta.mfi(tmp['High'], tmp['Low'], tmp['Close'], tmp['Volume'], length=14)
    df.at[i, 'mfi'] = mfi[-1]

    try:
        # 베타
        beta = ta.beta(tmp['Close'].iloc[-120:], kospiTmp['Close'].iloc[-120:], length=60)
        # corr
        corr = ta.corr(tmp['Close'].iloc[-120:], kospiTmp['Close'].iloc[-120:], length=60)
    except:
        # 베타
        beta = ta.beta(tmp['Close'].iloc[-120:], kospiTmp['Close'].iloc[-len(tmp):], length=60)
        # corr
        corr = ta.corr(tmp['Close'].iloc[-120:], kospiTmp['Close'].iloc[-len(tmp):], length=60)

    df.at[i, 'beta'] = beta[-1]
    df.at[i, 'corr'] = corr[-1]

dd = t.strftime('%Y-%m-%d')
deltadays = 0
t = t + timedelta(days=-1)
if datetime.weekday(t) == 6:
    deltadays = 2
else:
    deltadays = 0

t = t + timedelta(days=-deltadays)

d = t.strftime('%Y-%m-%d')

todayDf = df[(df['date'] == str(d)) & (
    df['maxPct'] > abs(df['minPct']))]  # '2022-10-31'

# todayDf = todayDf[todayDf['maxPct'] > 5]
# todayDf = fin_df[fin_df['date'] == '2022-10-31']#''

todayDf.to_csv(
    'cross1차.csv', encoding='utf-8-sig', index=False)
df.to_csv('cross전체.csv', encoding='utf-8-sig', index=False)