import pymysql

def dbConnector():
    host = '3.38.93.133'
    port = 3306
    user = 'root'
    password = '7786'
    database = 'blog'
    conn = pymysql.connect(host=host, port=port, user=user,
                            password=password, database=database)
    return conn