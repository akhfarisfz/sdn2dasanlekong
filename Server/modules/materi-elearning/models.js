
const mongoose = require("mongoose");

const MateriElearningSchema = new mongoose.Schema(
  { 
    id_guru:{},//Object id guru
    // id_siswa:{},
    judul:{type:String},
    deskripsi:{type:String},
    kelas:{type:Number},
    tangal_post: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const MateriElearning = mongoose.model("MateriElearning", MateriElearningSchema);

module.exports = {
  MateriElearning,
};
    
