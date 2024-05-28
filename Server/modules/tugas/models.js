
const mongoose = require("mongoose");

const TugasSchema = new mongoose.Schema(
  {
    // deskripsi: { type: String, required: true },
    // deadline: { type: Date, required: true },
    // id_materi: { type: mongoose.Schema.Types.ObjectId, ref: "MateriElearning", required: true },
    id_guru_pembuat: { type: mongoose.Schema.Types.ObjectId, ref: "Guru", required: true },
    kelas: { type: String, enum: ['1', '2', '3', '4', '5', '6'], required: true },
    rombel:{type : String, enum:['a','b']},
    created: { type: Date, default: Date.now },
    mata_pelajaran:{type:String},
    type: { type: String, enum: ['PG', 'Essay'], required: true },
    teks_soal: { type: String, required: true },
    opsi_jawaban: [
      {
        id: {type:Number},
        text: {type:String},
      }
    ], // Only for PG type
    kunci_jawaban: { type: String }, // Only for PG type
    skor: { type: Number, required: true },
    jawaban_essay: { type: String }, // Only for Essay type
  },
  { versionKey: false }
);



const Tugas = mongoose.model("Tugas", TugasSchema);

module.exports = {
  Tugas,
};

