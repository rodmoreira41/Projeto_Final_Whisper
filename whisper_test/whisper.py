# Video https://youtube.com/shorts/MNUdPGIjMPw
# Python 3.10
# pip install openai-whisper
# pip install git+https://github.com/openai/whisper.git 
# install ffmpeg
# brew install ffmpeg

import subprocess
import whisper
model = whisper.load_model("base")

video_in = 'video.mp4'
audio_out = 'audio.mp3'

ffmpeg_cmd = f"ffmpeg -i {video_in} -vn -c:a libmp3lame -b:a 192k {audio_out}"

subprocess.run(["ffmpeg", "-i", video_in, "-vn", "-c:a", "libmp3lame", "-b:a", "192k", audio_out])

result = model.transcribe(audio_out)
print(result["text"])