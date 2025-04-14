# ocr_routes.py
from flask import Blueprint, request, jsonify
import easyocr
import numpy as np
import cv2
import nltk
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

ocr_bp = Blueprint('ocr', __name__)
nltk.download('punkt')

reader = easyocr.Reader(['en'], gpu=False)

def summarize_text(text, sentences_count=2):
    try:
        parser = PlaintextParser.from_string(text, Tokenizer("english"))
        summarizer = LsaSummarizer()
        summary = summarizer(parser.document, sentences_count)
        return ' '.join([str(sentence) for sentence in summary])
    except Exception as e:
        print("Summary error:", e)
        return "Could not generate summary."

@ocr_bp.route('/ocr', methods=['POST'])
def ocr_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    image_bytes = file.read()
    image_array = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({'error': 'Invalid image'}), 400

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    results = reader.readtext(gray)

    if not results:
        return jsonify({'text': 'No text detected in the image.', 'summary': ''})

    text = ' '.join([res[1] for res in results])
    summary = summarize_text(text)

    return jsonify({'text': text, 'summary': summary})
