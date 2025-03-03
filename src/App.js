import React, { useState } from 'react';
import axios from 'axios';
import WebcamCapture from './components/organisms/WebcamCapture/WebcamCapture';
import NavbarComponent from './components/organisms/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button } from 'react-bootstrap';

function App() {
  const [image, setImage] = useState(null); // State untuk menyimpan gambar yang diunggah
  const [previewUrl, setPreviewUrl] = useState(null); // State untuk menyimpan URL preview
  const [prediction, setPrediction] = useState(null); // State untuk menyimpan hasil prediksi umur

  // Fungsi untuk menangani unggahan gambar
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(file);

    // Membuat preview gambar yang diunggah
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  // Fungsi untuk mengirim gambar ke backend Flask
  const handlePredict = async () => {
    if (!image) {
      alert('Silakan unggah gambar terlebih dahulu!');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      // Mengirim gambar ke backend dengan axios
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Menyimpan hasil prediksi umur
      setPrediction(response.data.predicted_age);
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat memproses gambar!');
    }
  };

  return (
    <div>
      {/* Navbar */}
      <NavbarComponent />

      {/* Komponen Kamera (WebcamCapture tetap tidak diubah) */}
      <WebcamCapture />

      {/* Input untuk mengunggah gambar */}
      <div className="container mt-4 text-center">
        <h2 className="title text-white">Upload Gambar untuk Prediksi Umur</h2>
        <input type="file" accept="image/*" onChange={handleUpload} className="form-control mt-2" />

        {/* Menampilkan preview gambar setelah diunggah */}
        {previewUrl && (
          <div className="mt-3">
            <h5 className="text-white">Preview</h5>
            <img src={previewUrl} alt="Preview" className="img-fluid mt-2" style={{ maxWidth: '300px', borderRadius: '10px' }} />
          </div>
        )}

        {/* Tombol Prediksi */}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <Button onClick={handlePredict}>Predict</Button>
        </div>

        {/* Menampilkan hasil prediksi jika ada */}
        {prediction && (
          <div className="alert alert-success mt-3">
            <h4>Hasil Prediksi:</h4>
            <p>
              Umur yang diperkirakan: <strong>{prediction}</strong> tahun
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
