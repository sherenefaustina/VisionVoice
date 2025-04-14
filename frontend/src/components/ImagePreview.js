import React from 'react';

function ImagePreview({ src }) {
  return (
    <div className="image-preview">
      <img src={src} alt="Uploaded preview" />
    </div>
  );
}

export default ImagePreview;
