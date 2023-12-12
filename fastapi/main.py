import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn, pymysql
from db import dbConnector
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

class Post(BaseModel):
    who: str
    kg: float
    content: str
    dt: datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to the specific origin of your React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/post")
async def fecthPost():
    conn = dbConnector()
    cursor = conn.cursor()
    try:
        sql = "SELECT owner_id, kg, content, fst_registered_dt FROM posting;"
        cursor.execute(sql)
        rows = cursor.fetchall()
        return [{"owner_id": row[0], "kg": row[1], "content": row[2], "fst_registered_dt": row[3]} for row in rows]
    except Exception as e:
        print(e)
        return {"msg": f"Error {e}"}
    finally:
        conn.close()

@app.post("/posted")
async def posted(post: Post):
    conn = dbConnector()
    cursor = conn.cursor()
    try:
        sql = """
            INSERT INTO posting (owner_id, kg, content, modified_dt) VALUES (%s, %s, %s, %s);
        """
        cursor.execute(sql, [post.who, post.kg, post.content, post.dt])
        conn.commit()
        return {"msg": "success"}
    except Exception as e:
        print(e)
        conn.rollback()
        return {"msg": f"Error {e}"}
    finally:
        conn.close()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8084, reload=True)


