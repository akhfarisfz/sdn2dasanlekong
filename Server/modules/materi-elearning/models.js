
const mongoose = require("mongoose");

const MateriElearningSchema = new mongoose.Schema(
  { 
    id_guru:{type: mongoose.Schema.Types.ObjectId, required: true},
    judul:{type:String},
    deskripsi:{type:String},
    kelas:{type:Number},
    // mata_pelajaran:{type: Schema.Types.ObjectId, ref:"Mata_Pelajaran"},// nanti bakal referensi 
    mata_pelajaran:{type: String},// nanti bakal referensi 
    tangal_post: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const MateriElearning = mongoose.model("MateriElearning", MateriElearningSchema);

module.exports = {
  MateriElearning,
};
    
