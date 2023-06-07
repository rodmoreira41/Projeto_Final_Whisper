from fastapi import FastAPI, UploadFile, File
import mysql.connector
import whisper
import os
from pytube import YouTube

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

@app.get('/GET_ALL_TRANSCRIPTIONS')
async def get_all_transcriptions():
    mycursor = database.cursor()
    mycursor.execute("SELECT * FROM transcriptions")
    result = mycursor.fetchall()

    transcriptions = []

    for row in result:
        transcription = {'id': row[0], 'text': row[1]}
        transcriptions.append(transcription)

    return {'transcriptions': transcriptions}

@app.post('/POST_TRANSCRIPTION_FILE')
async def insert_transcription_via_file(ficheiro: UploadFile = File(...)):
    
    temp_file_path = f"tmp/{ficheiro.filename}"
    with open(temp_file_path, "wb") as temp_file:
        contents = await ficheiro.read()
        temp_file.write(contents)
        
    transcription = model.transcribe(temp_file_path)
    text = transcription["text"]

    mycursor = database.cursor()
    sql_insert = "INSERT INTO transcriptions (text) VALUES (%s)"
    mycursor.execute(sql_insert, (text,))
    database.commit()

    os.remove(temp_file_path)
     
    return {'message': 'Transcription created successfully via file sumbission!'}

@app.post('/POST_TRANSCRIPTION_YOUTUBE')
async def insert_transcription_via_youtube(video_url: str):
    # Download the YouTube video as an MP4 file
    temp_file_path = "tmp/video.mp4"

    youtube = YouTube(video_url)
    video = youtube.streams.filter(only_audio=True).first()
    video.download(output_path="tmp", filename="video.mp4")

    # Transcribe the MP4 video using the Whisper model
    transcription = model.transcribe(temp_file_path)
    text = transcription["text"]

    # Insert the transcription into the database
    mycursor = database.cursor()
    sql_insert = "INSERT INTO transcriptions (text) VALUES (%s)"
    mycursor.execute(sql_insert, (text,))
    database.commit()

    # Clean up the temporary video file
    os.remove(temp_file_path)

    return {'message': 'Transcription created successfully via Youtube link!'}

@app.get('/GET_TRANSCRIPTION/{id}')
async def get_transcriptions():
    mycursor = database.cursor()
    mycursor.execute("SELECT * FROM transcriptions")
    result = mycursor.fetchall()

    transcriptions = []

    for row in result:
        transcription = {'id': row[0], 'text': row[1]}
        transcriptions.append(transcription)

    return {'transcriptions': transcriptions}


