
const mongoose = require("mongoose");

const TugasSchema = new Schema(
  {
    deskripsi: { type: String, required: true },
    deadline: { type: Date, required: true },
    id_materi: { type: mongoose.Schema.Types.ObjectId, ref: "MateriElearning", required: true },
    id_guru_pembuat: { type: mongoose.Schema.Types.ObjectId, ref: "Guru", required: true },
    created: { type: Date, default: Date.now },
    pertanyaan:[{
      number:{type:Number},
      pertanyaan:{type:String},
      pilihan:[{

      }]
    }],
    kunci_jawaban: [
      {
        number:{type:Number},
        text:{ type: String,required:true },
        isCorrect:{type:Boolean,required:true}
    }], 
    jawaban_siswa: [{ type: mongoose.Schema.Types.ObjectId, ref: "Jawabansiswa" }] // Referensi ke jawaban siswa
  },
  { versionKey: false }
);



const Tugas = mongoose.model("Tugas", TugasSchema);

module.exports = {
  Tugas,
};

