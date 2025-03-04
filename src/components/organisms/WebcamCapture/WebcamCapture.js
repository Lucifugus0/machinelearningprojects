import { useRef, useState } from 'react';
import WebcamView from '../../molecules/WebcamView/WebcamView';
import Button from '../../atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './WebcamCapture.module.css';

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Untuk navigasi ke halaman upload

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const capturedImage = canvas.toDataURL('image/png');
      setImage(capturedImage);

      // Simpan gambar ke Local Storage agar bisa diakses di UploadPage
      localStorage.setItem('capturedImage', capturedImage);
      
      // Pindah ke halaman upload setelah menangkap gambar
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <WebcamView videoRef={videoRef} />
      <Button onClick={captureImage}>Capture</Button>

      {image && <img src={image} alt="Captured" className={styles.capturedImage} />}

      <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480"></canvas>
    </div>
  );
};

export default WebcamCapture;
