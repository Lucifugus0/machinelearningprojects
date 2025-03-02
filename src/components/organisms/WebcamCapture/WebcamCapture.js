import { useRef, useState } from 'react';
import WebcamView from '../../molecules/WebcamView/WebcamView';
import Button from '../../atoms/Button/Button';
import styles from './WebcamCapture.module.css';

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
    <div className={styles.container}>
      {/* Realtime Video */}
      <WebcamView videoRef={videoRef} />

      {/* Tombol Capture */}
      <Button onClick={captureImage}>Capture</Button>

      {/* Hasil Gambar */}
      {image && <img src={image} alt="Captured" className={styles.capturedImage}/>}

      {/* Canvas (Hidden) */}
      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    </div>
  );
};

export default WebcamCapture;
