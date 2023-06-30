import whisper
import mysql.connector

database = mysql.connector.connect(
  host="localhost",
  user="root",
  password="12345678",
  database="video_transcriptions"
)

model = whisper.load_model("base")

video = input("Coloque aqui o caminho do vídeo que pretende transcrever e carregue no enter: ")
transcription = model.transcribe(video)
#exemplos_videos/howAIwillchangetheworld.mp3
#exemplos_videos/X2Download.app-Does 1_0 = Infinity_ #shorts(720p).mp4

mycursor = database.cursor()
sql_insert = "INSERT INTO transcriptions (text) VALUES (%s)"
mycursor.execute(sql_insert, (transcription["text"],))  # o texto precisa de ser convertido para tuple
database.commit() 

print("Sucesso!")

#mycursor.execute("SELECT * FROM transcriptions")
#result = mycursor.fetchall()
#for row in result:
  #print(row)
