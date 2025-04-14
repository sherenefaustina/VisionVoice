# backend/voice_assistant/intent_classifier.py

from transformers import pipeline

# Use zero-shot classification for dynamic intents
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Define your supported commands
COMMAND_LABELS = [
    "read text",
    "identify object",
    "navigate",
    "identify currency",
    "describe surroundings"
]

def classify_intent(text):
    result = classifier(text, COMMAND_LABELS)
    return result['labels'][0]  # Return the most likely intent
