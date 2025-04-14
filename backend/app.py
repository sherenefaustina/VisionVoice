from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from speech.routes import voice_bp  # Custom speech routes
from color_detector.color_pattern_analysis import analyze_image
from ocr_routes import ocr_bp  # OCR-related routes
from gtts import gTTS
import os
import uuid
import cv2

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(voice_bp)
app.register_blueprint(ocr_bp)

# Ensure uploads directory exists
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# === Dyslexia Text-to-Speech Endpoint ===
@app.route('/dyslexia-text-to-speech', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    text = data.get('text', '')

    if not text.strip():
        return jsonify({'error': 'No text provided'}), 400

    try:
        filename = f"speech_{uuid.uuid4().hex}.mp3"
        tts = gTTS(text)
        tts.save(filename)

        # Send audio file as response
        response = send_file(filename, mimetype='audio/mpeg', as_attachment=False)

        # Optional: Remove file after sending
        @response.call_on_close
        def cleanup():
            if os.path.exists(filename):
                os.remove(filename)

        return response

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# === Image Color Pattern Analysis Endpoint ===
@app.route("/analyze-image", methods=["POST"])
def analyze_image_route():
    try:
        image_file = request.files['image']
        filename = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4()}.jpg")
        image_file.save(filename)

        result = analyze_image(filename)
        os.remove(filename)

        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# === Main App Runner ===
if __name__ == "__main__":
    app.run(debug=True)
