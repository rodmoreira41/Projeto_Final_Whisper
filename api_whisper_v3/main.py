from fastapi import FastAPI, UploadFile, File, APIRouter, Header
from pytube import YouTube
from pydantic import BaseModel
import mysql.connector
import whisper, uuid, os, openai

#openai.api_key = "<YOUR-API-KEY>"

tags_metadata = [
    {
        "name": "API Key Creation",
        "description": "Esta secção serve para efetuar a criação de API Keys, necessárias para interagção do utilizador com a API.",
    },
    {
        "name": "Transcrições",
        "description": "Os métodos POST disponibilizados servem para efetuar a conversão de som de ficheiros mp3, mp4 ou até mesmo de vídeos do youtube, para texto. O utilizador poderá ainda gerir todas as transcrições que efetuar, com recurso à sua API Key",
    },
    {
        "name": "Smart Search Engine",
        "description": "Esta é uma secção em desenvolvimento.",
    },
]

app = FastAPI(
    docs_url= "/docs",
    redoc_url= "/redocs",
    title="API Whisper V2",
    description="Esta é a API desenvolvida no contexto de projeto final. O objetivo é que cada utilizador tenha a possibilidade de transcrever o som de vídeos, através do Whisper V2. Para interagir com a API, terá de criar uma API Key, que estará associada a todos os registos que efetuar.",
    version="3.0",
    openapi_url="/docs/openapi.json",
    openapi_tags=tags_metadata
)

database = mysql.connector.connect(
    host="localhost",
    user="root", # ou o utilizador da máquina local
    password="12345678", # ou a password do utilizador da máquina local
    database="whisper_project_v2" #"video_transcriptions"
)

model = whisper.load_model("base")

api_key_router = APIRouter(prefix="", tags=["API Key Creation"])
transcriptions_router = APIRouter(prefix="", tags=["Transcrições"])
smart_search_router = APIRouter(prefix="", tags=["Smart Search Engine"])

@app.get('/TRANSCRIPTIONS_TABLE')
async def transcriptions_table_verification():
    mycursor = database.cursor()
    mycursor.execute("SELECT * FROM transcriptions")
    result = mycursor.fetchall()

    transcriptions = []

    for row in result:
        transcription = {'id': row[0], 'text': row[1], 'source': row[2], 'source_type': row[3], 'api_key': row[4]}
        transcriptions.append(transcription)

    return {'transcriptions': transcriptions}

@app.get('/API_KEY_TABLE')
async def api_key_table_verification():
    mycursor = database.cursor()
    mycursor.execute("SELECT * FROM api_keys")
    result = mycursor.fetchall()

    api_keys = []

    for row in result:
        api_key = {'id': row[0], 'api_key': row[1]}
        api_keys.append(api_key)

    return {'api_keys': api_keys}

@api_key_router.post("/API_KEY")
async def create_your_api_key():
    # Geração de uma UUID API Key aleatória
    api_key = str(uuid.uuid4())

    # Armazenamento da API Key na base de dados
    mycursor = database.cursor()
    sql_insert = "INSERT INTO api_keys (api_key) VALUES (%s)"
    mycursor.execute(sql_insert, (api_key,))
    database.commit()

    # Divulgação da API Key com o utilizador
    return {"message": 'Your API Key was created. Please save it somewhere safe and accessibe, you will need it to interact with the API', "api_key": api_key}

@transcriptions_router.get('/TRANSCRIPTIONS')
async def get_transcriptions(api_key: str = Header(...)):
    # Verifica se a API Key existe
    mycursor = database.cursor()
    sql_check_api_key = "SELECT COUNT(*) FROM api_keys WHERE api_key = %s"
    mycursor.execute(sql_check_api_key, (api_key,))
    api_key_count = mycursor.fetchone()[0]
    
    if api_key_count == 0:
        return {'message': 'ERROR: The provided API Key does not exist.'}
    
    # Seleciona transcrições associadas com a API Key utilizada
    sql_select = "SELECT * FROM transcriptions WHERE api_key = %s"
    mycursor.execute(sql_select, (api_key,))
    result = mycursor.fetchall()

    if mycursor.rowcount == 0:
        return {'message': 'There are no transcriptions found for the provided API Key.'}

    transcriptions = []

    for row in result:
        transcription = {'id_transcription': row[0], 'text': row[1], 'source': row[2], 'source_type': row[3]}
        transcriptions.append(transcription)

    return {'transcriptions': transcriptions}


@transcriptions_router.post('/TRANSCRIPTION_FILE')
async def insert_transcription_via_file(ficheiro: UploadFile = File(...), api_key: str = Header(...)):
    # Verifica se a API Key existe
    mycursor = database.cursor()
    sql_check_api_key = "SELECT COUNT(*) FROM api_keys WHERE api_key = %s"
    mycursor.execute(sql_check_api_key, (api_key,))
    api_key_count = mycursor.fetchone()[0]
    
    if api_key_count == 0:
        return {'message': 'ERROR: The provided API Key does not exist.'}
    
    # Processamento do ficheiro recebido
    temp_file_path = f"tmp/{ficheiro.filename}"
    with open(temp_file_path, "wb") as temp_file:
        contents = await ficheiro.read()
        temp_file.write(contents)
    
    # Transcrição do ficheiro através do modelo Whisper
    transcription = model.transcribe(temp_file_path)
    text = transcription["text"]

    # Inserção da transcrição na tabela "transcriptions" da base de dados
    sql_insert = "INSERT INTO transcriptions (text, source, source_type, api_key) VALUES (%s, %s, %s, %s)"
    mycursor.execute(sql_insert, (text, ficheiro.filename, 'file_submission', api_key))
    database.commit()

    id_transcription = mycursor.lastrowid  # Determina o ID da última transcrição inserida, para demonstrá-lo na mensagem de retorno
    
    os.remove(temp_file_path) # faz a limpeza da pasta temporária onde foi guardado o ficheiro
     
    return {'message': f'Transcription with the ID number {id_transcription} was created successfully via file submission!', 'transcribed_text': {text}}

@transcriptions_router.post('/TRANSCRIPTION_YOUTUBE')
async def insert_transcription_via_youtube(video_url: str, api_key: str = Header(...)):
    
    # Verifica se a API Key existe
    mycursor = database.cursor()
    sql_check_api_key = "SELECT COUNT(*) FROM api_keys WHERE api_key = %s"
    mycursor.execute(sql_check_api_key, (api_key,))
    api_key_count = mycursor.fetchone()[0]
    
    if api_key_count == 0:
        return {'message': 'ERROR: The provided API Key does not exist.'}
    
    # Download do vídeo do YouTube no formato de um ficheiro MP4
    temp_file_path = "tmp/video.mp4"

    youtube = YouTube(video_url)
    video = youtube.streams.filter(only_audio=True).first()
    video.download(output_path="tmp", filename="video.mp4")

    # Transcrição do ficheiro MP4 através do modelo Whisper
    transcription = model.transcribe(temp_file_path)
    text = transcription["text"]

    # Inserção da transcrição na tabela "transcriptions" da base de dados
    mycursor = database.cursor()
    sql_insert = "INSERT INTO transcriptions (text, source, source_type, api_key) VALUES (%s, %s, %s, %s)"
    mycursor.execute(sql_insert, (text, video_url,'video_url', api_key))
    database.commit()

    id_transcription = mycursor.lastrowid  # Determina o ID da última transcrição inserida, para demonstrá-lo na mensagem de retorno

    os.remove(temp_file_path) # faz a limpeza da pasta temporária onde foi guardado o ficheiro

    return {'message': f'Transcription with the ID number {id_transcription} was created successfully via Youtube link!', 'transcribed_text': {text}}

class EditTranscriptionRequest(BaseModel):
    updated_text: str
    
@transcriptions_router.put('/TRANSCRIPTION/{id}')
async def edit_transcription(id_transcription: int, request_data: EditTranscriptionRequest, api_key: str = Header(...)):
    
    # Verifica se a API Key existe
    mycursor = database.cursor()
    sql_check_api_key = "SELECT COUNT(*) FROM api_keys WHERE api_key = %s"
    mycursor.execute(sql_check_api_key, (api_key,))
    api_key_count = mycursor.fetchone()[0]

    if api_key_count == 0:
        return {'message': 'ERROR: The provided API Key does not exist.'}

    # Esta query de SQL permite verificar simultaneamente se o ID da transcrição existe e se este está associado à API Key fornecida
    sql_check_transcription = "SELECT COUNT(*) FROM transcriptions WHERE id_transcription = %s AND api_key = %s"
    mycursor.execute(sql_check_transcription, (id_transcription, api_key))
    transcription_count = mycursor.fetchone()[0]

    if transcription_count == 0:
        return {'message': 'ERROR: The ID of transcription provided does not exist or cannot be managed by this API Key.'}

    updated_text = request_data.updated_text #atribuição do valor pedido no body request a uma variável

    # Atualização da transcrição na tabela da base de dados
    sql_update = "UPDATE transcriptions SET text = %s WHERE id_transcription = %s"
    mycursor.execute(sql_update, (updated_text, id_transcription))
    database.commit()

    return {'message': f'SUCCESS: Transcription with the ID number {id_transcription} was updated successfully!', 'modified_text': updated_text}

@transcriptions_router.delete('/TRANSCRIPTION/{id}')
async def delete_transcription(id_transcription: int, api_key: str = Header(...)):
    # Verifica se a API Key existe
    mycursor = database.cursor()
    sql_check_api_key = "SELECT COUNT(*) FROM api_keys WHERE api_key = %s"
    mycursor.execute(sql_check_api_key, (api_key,))
    api_key_count = mycursor.fetchone()[0]

    if api_key_count == 0:
        return {'message': 'ERROR: The provided API Key does not exist.'}

    # Esta query de SQL permite verificar simultaneamente se o ID da transcrição existe e se este está associado à API Key fornecida
    sql_check_transcription = "SELECT COUNT(*) FROM transcriptions WHERE id_transcription = %s AND api_key = %s"
    mycursor.execute(sql_check_transcription, (id_transcription, api_key))
    transcription_count = mycursor.fetchone()[0]

    if transcription_count == 0:
        return {'message': 'ERROR: The ID of transcription provided does not exist or cannot be managed by this API Key.'}

    # Apaga a transcrição da tabela da base de dados
    sql_delete = "DELETE FROM transcriptions WHERE id_transcription = %s"
    mycursor.execute(sql_delete, (id_transcription,))
    database.commit()

    return {'message': f'SUCCESS: Transcription with the ID number {id_transcription} was deleted successfully!'}

class SmartSearchRequest(BaseModel):
    id_transcription: int
    query: str
    
@smart_search_router.post('/SMART_SEARCH')
async def smart_search(id_transcription: int, query: str):
    # Obtém a transcrição escolhida da base de dados
    mycursor = database.cursor()
    sql_select = "SELECT text FROM transcriptions WHERE id_transcription = %s"
    mycursor.execute(sql_select, (id_transcription,))
    result = mycursor.fetchone()

    if mycursor.rowcount == 0:
        return {'message': f'ERROR: The transcription with the ID number {id_transcription} does not exist'}
    
    transcription_text = result[0]  # Extração do texto transcrito para uma variável

    # Efetua uma "Smart Search" através da API do OpenAI
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=query,
        documents=[transcription_text],
        max_tokens=100,
        temperature=0.7,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )

    # Extração da resposta da API do OpenAI 
    answer = response.choices[0].text.strip()

    return {'query': query, 'answer': answer}

app.include_router(api_key_router)
app.include_router(transcriptions_router)
app.include_router(smart_search_router)

