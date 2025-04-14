import React from "react";
import "../styles/dislexic.css";
import { useNavigate } from "react-router-dom";

const Dislexic = () => {
  const navigate = useNavigate();

  return (
    <div className="dislexic-container">
      <h1 className="dislexic-title">Empower Reading & Writing — Your Way!</h1>
      <div className="card-container">
        {/* Reading Card */}
        <div className="card" onClick={() => navigate("/ocr-reader")}>
          <div className="card-inner">
            <div className="card-front">Reading</div>
            <div className="card-back">Start Reading 🚀</div>
          </div>
        </div>

        {/* Writing Card */}
        <div className="card" onClick={() => navigate("/writing")}>
          <div className="card-inner">
            <div className="card-front">Writing</div>
            <div className="card-back">Voice Input ✨</div>
          </div>
        </div>

        {/* Text-to-Speech Card */}
        <div className="card" onClick={() => navigate("/text-to-speech")}>
          <div className="card-inner">
            <div className="card-front">Text-to-Speech</div>
            <div className="card-back">Read Aloud 🎤</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dislexic;
