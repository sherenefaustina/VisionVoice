import React, { useState } from 'react';
import UploadArea from './UploadArea';
import ImagePreview from './ImagePreview';
import TextResult from './TextResult';
import '../styles/ocr.css';

const OCRReader = () => {
  const [image, setImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (file) => {
    setImage(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:5000/ocr', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        setOcrText(data.text || 'No text detected.');
        setSummary(data.summary || 'No summary available.');
        setLoading(false);
      })
      .catch(() => {
        alert('Error processing image.');
        setLoading(false);
      });
  };

  const highlightImportantWords = (text) => {
    const keywords = ['important', 'critical', 'urgent', 'emergency']; // example keywords
    let highlightedText = text;

    keywords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, (match) => `<span class="highlight">${match}</span>`);
    });

    return highlightedText;
  };

  const reset = () => {
    setImage(null);
    setOcrText('');
    setSummary('');
  };

  return (
    <div className="ocr-reader-container">
  
      <h1 className="ocr-heading">See It, Snap It, Read It! 📖</h1>
      {!image && (
        <div className="upload-card">
          <UploadArea onUpload={handleImageUpload} />
        </div>
      )}
      {loading && (
        <div className="processing-container">
          <div className="spinner"></div>
          <p>Processing image...</p>
        </div>
      )}
      {!loading && image && (
        <div className="result-container fade-in">
          <ImagePreview src={image} />
          <TextResult 
            text={highlightImportantWords(ocrText)} 
            summary={summary} 
            onReset={reset} 
          />
        </div>
      )}
    </div>
  );
};

export default OCRReader;
