from fastapi import FastAPI, UploadFile, File
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

@app.post('/POST_TRANSCRIPTION')
async def create_transcription(video: UploadFile = File(...)):
    transcription = model.transcribe(video.file)
    text = transcription["text"]

    mycursor = database.cursor()

    sql_insert = "INSERT INTO transcriptions (text) VALUES (%s)"
    mycursor.execute(sql_insert, (text,))
    
    database.commit()

    return {'message': 'Transcription created successfully'}

@app.get('/GET_TRANSCRIPTIONS')
async def get_transcriptions():
    mycursor = database.cursor()
    mycursor.execute("SELECT * FROM transcriptions")
    result = mycursor.fetchall()

    transcriptions = []

    for row in result:
        transcription = {'id': row[0], 'text': row[1]}
        transcriptions.append(transcription)

    return {'transcriptions': transcriptions}


