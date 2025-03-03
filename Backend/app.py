# Import library yang diperlukan
from flask import Flask, request, jsonify  # Flask untuk membuat server, request untuk menangani data masuk, jsonify untuk format JSON
from flask_cors import CORS  # Memungkinkan akses API dari domain frontend yang berbeda
import os  # Untuk operasi file seperti membuat folder dan menghapus file
from deepface import DeepFace  # Library untuk mendeteksi usia dari wajah

# Inisialisasi aplikasi Flask
app = Flask(__name__)

# Mengaktifkan CORS agar frontend React bisa mengakses backend ini
CORS(app)

# Folder tempat menyimpan sementara gambar yang di-upload
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Membuat folder jika belum ada
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER  # Menyimpan konfigurasi folder upload

# Endpoint utama untuk mengecek apakah backend berjalan
@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})  # Mengembalikan pesan dalam format JSON

# Endpoint untuk prediksi umur dari gambar yang diunggah
@app.route("/predict", methods=["POST"])
def predict_age():
    # Periksa apakah ada file yang dikirim dari frontend
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400  # Jika tidak ada gambar, kembalikan error 400

    # Ambil file gambar dari request
    file = request.files["image"]
    filename = file.filename  # Ambil nama file aslinya
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)  # Tentukan path penyimpanan file
    file.save(filepath)  # Simpan file ke folder uploads

    try:
        # Gunakan DeepFace untuk memprediksi umur dari gambar yang di-upload
        result = DeepFace.analyze(img_path=filepath, actions=["age"])
        age = result[0]["age"]  # Ambil data umur dari hasil analisis

        # Hapus gambar setelah diproses untuk menghemat ruang penyimpanan
        os.remove(filepath)

        # Kembalikan hasil prediksi ke frontend dalam format JSON
        return jsonify({"predicted_age": age})
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Tangani error jika terjadi kesalahan saat prediksi

# Menjalankan aplikasi Flask
if __name__ == "__main__":
    # Menjalankan server pada localhost port 5000
    # host="0.0.0.0" agar bisa diakses dari jaringan lain jika diperlukan
    app.run(host="0.0.0.0", port=5000, debug=True)
