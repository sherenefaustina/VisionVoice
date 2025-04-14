// src/components/ColorDetector.jsx
import React, { useEffect, useRef, useState } from 'react';
import '../styles/colorDetector.css';

const ColorDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      videoRef.current.srcObject = stream;
    });

    // Capture after 5 seconds
    const timeout = setTimeout(() => {
      captureImage();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const captureImage = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'capture.jpg');

      const res = await fetch('http://127.0.0.1:5000/analyze-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setResult(data.result);
      speakText(data.result);
    }, 'image/jpeg');
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  return (
    <div className="detector-container">
      <h2 className="detector-title">Picture-perfect! Hold still while we analyze... 📸</h2>

      <video ref={videoRef} autoPlay playsInline muted width="400" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {result && (
        <div className="result-box">
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default ColorDetector;
