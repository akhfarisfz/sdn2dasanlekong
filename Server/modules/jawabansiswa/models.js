
const mongoose = require("mongoose");

const JawabansiswaSchema = new mongoose.Schema(
  { 
    id_tugas: { type: mongoose.Schema.Types.ObjectId, ref: "Tugas", required: true }, // Referensi ke ID Tugas
    id_siswa: { type: mongoose.Schema.Types.ObjectId, ref: "Siswa", required: true }, // Referensi ke ID Siswa
    jawaban: { type: String, required: true }, // Jawaban siswa untuk tugas
    tanggal_pengumpulan: { type: Date, default: Date.now }, // Tanggal pengumpulan jawaban
    nilai: { type: Number }
  },
  { versionKey: false }
);

const Jawabansiswa = mongoose.model("Jawabansiswa", JawabansiswaSchema);

module.exports = {
  Jawabansiswa,
};
    
