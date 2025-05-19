const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/absensi')
  .then(() => console.log('Berhasil terhubung ke MongoDB!'))
  .catch((err) => console.log('Gagal terhubung ke MongoDB:', err));


const AbsenSchema = new mongoose.Schema({
  nama: String,
  kelas: String,
  status: String,
  tanggal: String,
  waktu: String,
  hari: String,
  foto: String
});

const Absen = mongoose.model('Absen', AbsenSchema);

app.use(cors());
app.use(express.json());

// Kirim data dari user
app.post('/api/absen', async (req, res) => {
  try {
    const absen = new Absen(req.body);
    await absen.save();
    res.json({ message: 'Data absensi berhasil disimpan!' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal simpan data' });
  }
});

// Kirim data ke admin
app.get('/api/absen', async (req, res) => {
  try {
    const data = await Absen.find().sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

app.listen(5000, () => {
  console.log('Server jalan di http://localhost:5000');
});
