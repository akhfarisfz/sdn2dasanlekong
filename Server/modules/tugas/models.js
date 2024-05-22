
const mongoose = require("mongoose");

const TugasSchema = new mongoose.Schema(
  {
    deskripsi: { type: String, required: true },
    deadline: { type: Date, required: true },
    id_materi: { type: mongoose.Schema.Types.ObjectId, ref: "MateriElearning", required: true },
    id_guru_pembuat: { type: mongoose.Schema.Types.ObjectId, ref: "Guru", required: true },
    created: { type: Date, default: Date.now },
    pertanyaan: [{
      teks_soal: { type: String, required: true },
      opsi_jawaban: [{
        pilihan_jawaban: { type: String }
      }],
      kunci_jawaban: { type: Number, required: true },//Pakai index
      skor: { type: Number, default: 1 }
    }],
    jawaban_siswa: [{
      id_tugas: { type: mongoose.Schema.Types.ObjectId, ref: "Tugas", required: true },  
      id_siswa: { type: mongoose.Schema.Types.ObjectId, ref: "Siswa", required: true }, 
      jawaban: [{
        pertanyaan_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tugas.pertanyaan" },  
        jawaban_siswa: { type: String }
      }],
      tanggal_pengumpulan: { type: Date, default: Date.now }, 
      nilai: { type: Number }
    }],
    total_skor: { type: Number, default: 0 }
  },
  { versionKey: false }
);



const Tugas = mongoose.model("Tugas", TugasSchema);

module.exports = {
  Tugas,
};

