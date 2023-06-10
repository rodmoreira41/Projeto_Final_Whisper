from fastapi import FastAPI, UploadFile, File, APIRouter
import mysql.connector
import whisper
import os
from pytube import YouTube
from pydantic import BaseModel
import openai


app = FastAPI(
    docs_url= "/api/v2/docs",
    redoc_url= "/api/v2/redocs",
    title="API Whisper V2",
    description="Esta é a API desenvolvida no contexto de projeto final. Esta é a primeira versão da API, que conta com uma base de dados simples para armazenar as transcrições, que podem ser obtidas através de um vídeo do Youtube, ou de um ficheiro mp3 ou mp4",
    version="2.0",
    openapi_url="/api/v2/docs/openapi.json"
)

database = mysql.connector.connect(
    host="localhost",
    user="root", # ou o utilizador da máquina local
    password="12345678", # ou a password do utilizador da máquina local
    database="whisper_project" #"video_transcriptions"
)

model = whisper.load_model("base")

transcriptions_router = APIRouter(prefix="", tags=["Transcriptions"])

@transcriptions_router.get('/GET_ALL_TRANSCRIPTIONS')
async def get_all_transcriptions():
    mycursor = database.cursor()
    mycursor.execute("SELECT * FROM transcriptions")
    result = mycursor.fetchall()

    transcriptions = []

    for row in result:
        transcription = {'id': row[0], 'text': row[1], 'source': row[2], 'source_type': row[3]}
        transcriptions.append(transcription)

    return {'transcriptions': transcriptions}

@transcriptions_router.get('/GET_TRANSCRIPTION/{id}')
async def get_transcription_by_id(id: int):
    mycursor = database.cursor()
    sql_select = "SELECT * FROM transcriptions WHERE id_transcription = %s"
    mycursor.execute(sql_select, (id,))
    result = mycursor.fetchone()

    if mycursor.rowcount == 0:
        return {'message': f'ERROR: The transcription with the ID number {id} does not exist'}

    transcription = {'id': result[0], 'text': result[1], 'source': result[2], 'source_type': result[3]}

    return {'transcription': transcription}

@transcriptions_router.post('/POST_TRANSCRIPTION_FILE')
async def insert_transcription_via_file(ficheiro: UploadFile = File(...)):
    
    temp_file_path = f"tmp/{ficheiro.filename}"
    with open(temp_file_path, "wb") as temp_file:
        contents = await ficheiro.read()
        temp_file.write(contents)
        
    transcription = model.transcribe(temp_file_path)
    text = transcription["text"]

    mycursor = database.cursor()
    sql_insert = "INSERT INTO transcriptions (text, source, source_type) VALUES (%s, %s, 'file_submission')"
    mycursor.execute(sql_insert, (text, ficheiro.filename,))
    database.commit()

    transcription_id = mycursor.lastrowid  # Retrieve the ID of the last inserted row
    
    os.remove(temp_file_path)
     
    return {'message': f'Transcription with the ID number {transcription_id} was created successfully via file submission!', 'transcribed_text': {text}}

@transcriptions_router.post('/POST_TRANSCRIPTION_YOUTUBE')
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
    sql_insert = "INSERT INTO transcriptions (text, source, source_type) VALUES (%s, %s, 'video_url')"
    mycursor.execute(sql_insert, (text, video_url, ))
    database.commit()

    transcription_id = mycursor.lastrowid  # Retrieve the ID of the last inserted row

    # Clean up the temporary video file
    os.remove(temp_file_path)

    return {'message': f'Transcription with the ID number {transcription_id} was created successfully via Youtube link!', 'transcribed_text': {text}}

class EditTranscriptionRequest(BaseModel):
    updated_text: str
    
@transcriptions_router.put('/EDIT_TRANSCRIPTION/{id}')
async def edit_transcription(id: int, request_data: EditTranscriptionRequest):
    updated_text = request_data.updated_text

    mycursor = database.cursor()
    sql_update = "UPDATE transcriptions SET text = %s WHERE id_transcription = %s"
    mycursor.execute(sql_update, (updated_text, id))
    database.commit()

    if mycursor.rowcount == 0:
        return {'message': f'ERROR: The transcription with the ID number {id} does not exist'}

    return {'message': f'SUCCESS: Transcription with the ID number {id} was updated successfully!', 'modified_text': updated_text}

@transcriptions_router.delete('/DELETE_TRANSCRIPTION/{id}')
async def delete_transcription(id: int):
    mycursor = database.cursor()
    sql_delete = "DELETE FROM transcriptions WHERE id_transcription = %s"
    mycursor.execute(sql_delete, (id,))
    database.commit()

    if mycursor.rowcount == 0:
        return {'message': f'ERROR: The transcription with the ID number {id} does not exist'}

    return {'message': f'SUCCESS: Transcription with the ID number {id} was deleted successfully!'}

app.include_router(transcriptions_router)

