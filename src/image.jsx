import React, { useRef, useEffect } from 'react';

const CanvasImage = ({ imageUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loadImage = () => {
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    };

    loadImage();
  }, [imageUrl]);

  return <canvas ref={canvasRef} width={400} height={400} />;
};

export default CanvasImage;
