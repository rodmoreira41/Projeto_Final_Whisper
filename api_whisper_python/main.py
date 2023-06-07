from fastapi import FastAPI
import whisper
import mysql.connector

app = FastAPI(
    docs_url= "/api/v2/docs",
    redoc_url= "/api/v2/redocs",
    title="API Whisper V2",
    description="Esta é a API desenvolvida no contexto de projeto final. ####",
    version="1.0",
    openapi_url="/api/v2/docs/openapi.json"
)

database = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345678",
    database="video_transcriptions"
)

model = whisper.load_model("base")

@app.get('/')
async def root():
    return {'message': 'Hello World'}

@app.post('/transcriptions')
async def create_transcription(video_path: str):
    transcription = model.transcribe(video_path)
    text = transcription["text"]

    mycursor = database.cursor()

    sql_insert = "INSERT INTO transcriptions (text) VALUES (%s)"
    mycursor.execute(sql_insert, (text,))

    database.commit()

    return {'message': 'Transcription created successfully'}

@app.get('/transcriptions')
async def get_transcriptions():
    mycursor = database.cursor()
    mycursor.execute("SELECT * FROM transcriptions")
    result = mycursor.fetchall()

    transcriptions = []
    for row in result:
        transcriptions.append(row[0])

    return {'transcriptions': transcriptions}