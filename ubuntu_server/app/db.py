import pymysql

def dbConnector():
    host = '112.169.16.65'
    port = 8855
    user = 'root'
    password = '7786'
    database = 'binance'
    conn = pymysql.connect(host=host, port=port, user=user,
                            password=password, database=database)
    return conn