
const mongoose = require("mongoose");

const MateriElearningSchema = new mongoose.Schema(
  { 
    id_guru:{type: mongoose.Schema.Types.ObjectId, required: true},
    judul:{type:String},
    deskripsi:{type:String},
    kelas:{type:Number},
    mata_pelajaran:{
      nama_mapel:{type:String},
    },
    url_file_materi:{type:String},
    tangal_post: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const MateriElearning = mongoose.model("MateriElearning", MateriElearningSchema);

module.exports = {
  MateriElearning,
};
    
