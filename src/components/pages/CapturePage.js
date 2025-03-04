import React from 'react';
import WebcamCapture from '../organisms/WebcamCapture/WebcamCapture';
import { useNavigate } from 'react-router-dom';

const CapturePage = ({ setCapturedImage }) => {
  const navigate = useNavigate();

  // Fungsi menangkap gambar dari webcam dan mengirim ke UploadPage
  const handleCapture = (imageData) => {
    setCapturedImage(imageData);
    navigate('/upload'); // Pindah ke halaman Upload setelah capture
  };

  return (
    <div className="container mt-4 text-center">
      <h2 className="text-white">Ambil Gambar dari Webcam</h2>
      <WebcamCapture onCapture={handleCapture} />
    </div>
  );
};

export default CapturePage;
