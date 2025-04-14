import React, { useState, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import '../styles/voice.css';

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const recognitionRef = useRef(null);

  const keywords = ['important', 'note', 'remember', 'attention', 'focus', 'alert'];

  const highlightImportant = (text) => {
    return text
      .split('. ')
      .map((sentence) => {
        const lower = sentence.toLowerCase();
        const isImportant = keywords.some((word) => lower.includes(word));
        return isImportant
          ? `<span class="highlight">${sentence.trim()}.</span>`
          : `${sentence.trim()}.`;
      })
      .join(' ');
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interim = '';
      let final = finalTranscript;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += ' ' + transcriptChunk;
        } else {
          interim += transcriptChunk;
        }
      }

      setLiveTranscript(interim);
      setFinalTranscript(final);
    };

    recognition.onend = () => {
      if (listening) recognition.start();
    };

    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setLiveTranscript('');
  };

  const handleToggle = () => {
    if (listening) {
      stopListening();
    } else {
      setFinalTranscript(''); // reset previous final
      startListening();
    }
  };

  const handleDone = () => {
    stopListening();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="split-container">
      <div className="left-panel">
        <h2>🎙 Voice Assistant</h2>
        <p>Click the mic and start speaking.</p>
        <button className="voice-button" onClick={handleToggle}>
          <FaMicrophone className={listening ? 'mic-on' : ''} />
        </button>
        <button className="done-button" onClick={handleDone}>
          Done
        </button>
      </div>

      <div className="right-panel">
        <h2 className="diary-header">📝 Live Diary</h2>
        <div
          className="voice-output"
          dangerouslySetInnerHTML={{
            __html: highlightImportant(finalTranscript + ' ' + liveTranscript),
          }}
        />
      </div>

      {showPopup && (
        <div className="popup-diary">
          <h2>📔 Full Speech Entry</h2>
          <div
            className="popup-content"
            dangerouslySetInnerHTML={{
              __html: highlightImportant(finalTranscript),
            }}
          />
          <button className="done-button" onClick={handleClosePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
