# backend/speech/routes.py

from flask import Blueprint, request, jsonify
import whisper
from transformers import pipeline
import tempfile

# Setup Blueprint
voice_bp = Blueprint('voice_bp', __name__)

# Load Whisper model once globally
model = whisper.load_model("base")

# Sample NLP classification using HuggingFace pipeline
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Define possible intents
CANDIDATE_LABELS = ["read text", "identify object", "navigate", "detect currency"]

@voice_bp.route('/api/voice-command', methods=['POST'])
def voice_command():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        audio_file.save(tmp.name)
        result = model.transcribe(tmp.name)
        transcription = result["text"]

    classification = classifier(transcription, CANDIDATE_LABELS)
    top_intent = classification['labels'][0]

    return jsonify({
        'transcription': transcription,
        'intent': top_intent
    })
