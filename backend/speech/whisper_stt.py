# backend/voice_assistant/whisper_stt.py

import whisper
import os
import tempfile

model = whisper.load_model("base")  # You can also use "small" or "medium"

def transcribe_audio(file):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp:
        temp.write(file.read())
        temp_path = temp.name

    result = model.transcribe(temp_path)
    os.remove(temp_path)
    return result['text']
