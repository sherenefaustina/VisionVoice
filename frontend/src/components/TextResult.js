import React from 'react';

function TextResult({ text, summary, onReset }) {
  return (
    <div className="text-result">
      <h2>📝 Extracted Text</h2>
      <p>{text}</p>
      <button onClick={onReset}>🔄 Upload Another</button>
    </div>
  );
}

export default TextResult;
