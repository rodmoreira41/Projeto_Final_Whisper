import whisper

model = whisper.load_model("base")

video = input("Coloque aqui o caminho do vídeo que pretende transcrever e carregue no enter: ")
resultado = model.transcribe(video)
#resultado = model.transcribe("whisper_test/videos_whisper/howAIwillchangetheworld.mp3")
print(resultado["text"])

