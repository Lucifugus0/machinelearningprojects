import { useRef, useState } from 'react';
import WebcamView from '../../molecules/WebcamView/WebcamView';
import Button from '../../atoms/Button/Button';

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <WebcamView videoRef={videoRef} />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
      <Button onClick={captureImage}>Capture</Button>
      {image && <img src={image} alt="Captured" style={{ marginTop: '20px', maxWidth: '100%' }} />}
    </div>
  );
};

export default WebcamCapture;
