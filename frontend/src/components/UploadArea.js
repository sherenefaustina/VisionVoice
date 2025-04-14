import React from 'react';

function UploadArea({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="upload-area">
      <label className="upload-label">
        📷 Upload Image
        <input type="file" accept="image/*" onChange={handleChange} hidden />
      </label>
    </div>
  );
}

export default UploadArea;
