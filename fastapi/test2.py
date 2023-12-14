import pandas as pd
import numpy as np
import FinanceDataReader as fdr
# import talib
from datetime import timedelta, datetime
import requests
import time
# import pickle
from warnings import filterwarnings
# from pykrx import stock
import subprocess, os
# import pandas_ta as ta
filterwarnings('ignore')

fin_df = pd.read_csv(f'{os.getcwd()}\\fastapi\\test.csv', encoding='utf-8-sig')
merge_df = pd.DataFrame()
for i in range(len(fin_df['Close'])):
    date1 = (
        datetime.strptime(fin_df['date'].iloc[i], '%Y-%m-%d').strftime('%Y%m%d') + timedelta(days=-60))
    date2 = fin_df['date'].iloc[i].replace('-', '')
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
fin_df.to_csv('test2.csv', encoding='utf-8-sig')