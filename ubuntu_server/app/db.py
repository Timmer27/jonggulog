import pymysql

def dbConnector():
    host = process.env.HOST
    port = process.env.PORT
    user = process.env.USER
    password = process.env.PW
    database = process.env.DB
    conn = pymysql.connect(host=host, port=port, user=user,
                            password=password, database=database)
    return conn
