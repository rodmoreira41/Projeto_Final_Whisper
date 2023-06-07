from fastapi import FastAPI, File, UploadFile
import whisper
import mysql.connector

app = FastAPI(
    docs_url="/api/docs",
    redoc_url="/api/redocs",
    title="API Whisper",
    description="API for video transcriptions",
    version="1.0",
    openapi_url="/api/openapi.json"
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
async def create_transcription(video: UploadFile = File(...)):
    transcription = model.transcribe(video.file)
    text = transcription["text"]

    mycursor = database.cursor()

    sql_insert = "INSERT INTO transcriptions (text) VALUES (%s)"
    mycursor.execute(sql_insert, (text,))

    database.commit()

    return {'message': 'Transcription created successfully'}