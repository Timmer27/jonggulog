from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pymysql
from db import dbConnector

from starlette.applications import Starlette
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app = Starlette()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

class info(BaseModel):
    api: str
    secret: str
    binanceId: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # Allow any origin
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


app = FastAPI()

@app.get("/")
@limiter.limit("15/minute")
async def test(request: Request):
    return {"result": 'hi'}

@app.get("/{userId}")
@limiter.limit("15/minute")
async def isValidated(request: Request, userId: str):
    conn = dbConnector()
    cursor = conn.cursor()
    try:
        print('connected ID:', userId)

        sql = """
            SELECT
                rl.isValid
            FROM referral rl
                WHERE rl.userId = %s
            -- GROUP BY rl.userId
        """
        cursor.execute(sql, [userId])
        row = cursor.fetchone()
        isValid = row[0]

        if isValid == 1:
            return {"result": True}
        else:
            return {"result": False}
    except Exception as e:
        print('NOT VALID ID')
        return {"result": False}
    finally:
        conn.close()


subapi = FastAPI()
subapi.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)
app.mount("/keys", subapi)

@subapi.post("/access")
@limiter.limit("15/minute")
# @cache(expire=30)
async def save_keys(request: Request, info: info):
    # print(info.api)
    conn = dbConnector()
    cursor = conn.cursor()
    try:
        # insert_query = 'INSERT INTO `referral` (userId) VALUES (%s)'
        insert_user = 'REPLACE INTO `user` (api, secret, binanceId) VALUES (%s, %s, %s)'
        insert_referral = 'INSERT INTO `referral` (userId, isValid) VALUES (%s, %s)'
        
        insert_user_values = [info.api, info.secret, info.binanceId]
        cursor.execute(insert_user, insert_user_values)
        conn.commit()

        insert_referral_values = [info.binanceId, 1]
        cursor.execute(insert_referral, insert_referral_values)
        conn.commit() 
        return {"result": True}
    except pymysql.IntegrityError as pkError:
        pass
    except Exception as e:
        # print(e)               
        return {"result": False}
    finally:
        conn.close()
