import React, { useState } from "react";
import "../styles/text-to-speech.css";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/dyslexia-text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Erroyr:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tts-container">
  <h2>Type it. Hear it. Love it.</h2>
  <div className="textarea-wrapper">
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type your thoughts here..."
    />
  </div>
  <button onClick={handleSpeak}>🔊 Read Aloud</button>

    </div>
  );
};

export default TextToSpeech;
