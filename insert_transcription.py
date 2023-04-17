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
text = transcription["text"]
#caminho do video: whisper_test/videos_whisper/howAIwillchangetheworld.mp3
#whisper_test\videos_whisper\X2Download.app-Does 1_0 = Infinity_ #shorts(720p).mp4

mycursor = database.cursor()

sql_insert = "INSERT INTO transcriptions (text) VALUES (%s)"
mycursor.execute(sql_insert, (text,))  # o texto precisa de ser convertido para tuple

database.commit() 

#mycursor.execute("SELECT * FROM transcriptions")
#result = mycursor.fetchall()
#for row in result:
  #print(row)

print("Sucesso!")
