import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    // Ambil gambar dari localStorage jika ada
    const capturedImage = localStorage.getItem('capturedImage');
    if (capturedImage) {
      setPreviewUrl(capturedImage);
      setImage(capturedImage);
    }
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handlePredict = async () => {
    if (!image) {
      alert('Silakan unggah gambar terlebih dahulu!');
      return;
    }

    const formData = new FormData();

    // Jika gambar dari localStorage, ubah ke Blob sebelum dikirim
    if (typeof image === 'string') {
      const blob = await fetch(image).then(res => res.blob());
      formData.append('image', blob, 'captured-image.png');
    } else {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('https://agepredictlearnt.netlify.app//predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPrediction(response.data.predicted_age);
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat memproses gambar!');
    }
  };

  return (
    <div className="container mt-4 text-center">
      <h2 className="title text-white">Upload Gambar untuk Prediksi Umur</h2>
      <input type="file" accept="image/*" onChange={handleUpload} className="form-control mt-2" />

      {previewUrl && (
        <div className="mt-3">
          <h5 className="text-white">Preview</h5>
          <img src={previewUrl} alt="Preview" className="img-fluid mt-2" style={{ maxWidth: '300px', borderRadius: '10px' }} />
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center mt-3">
        <Button onClick={handlePredict}>Predict</Button>
      </div>

      {prediction && (
        <div className="alert alert-success mt-3">
          <h4>Hasil Prediksi:</h4>
          <p>Umur yang diperkirakan: <strong>{prediction}</strong> tahun</p>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
