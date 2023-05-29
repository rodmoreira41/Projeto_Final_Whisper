from fastapi import FastAPI
import random

app = FastAPI()

@app.get('/')
async def root():
    return {'example': 'This is and example', 'data': 99}

@app.get('/random')
async def get_random():
    random_n = random.randint(0, 100)
    return{'number': random_n, 'limit': 100}


@app.get('/random/{limit}')
async def get_random(limit: int):
    random_n = random.randint(0, limit)
    return{'number': random_n, 'limit': limit}