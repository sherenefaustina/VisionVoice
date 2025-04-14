import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dislexic from "./components/Dislexic";
import VoiceAssistant from "./components/VoiceAssistant";
import ColorDetector from './components/ColorDetector';
import OCRReader from './components/OCRReader';
import TextToSpeech from './components/TextToSpeech';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dislexic" element={<Dislexic />} />
        <Route path="/writing" element={<VoiceAssistant />} />
        <Route path="/color-detector" element={<ColorDetector />} />
        <Route path="/ocr-reader" element={<OCRReader />} />
        <Route path="/text-to-speech" element={<TextToSpeech />} />
     

      </Routes>
    </Router>
  );
}

export default App;
