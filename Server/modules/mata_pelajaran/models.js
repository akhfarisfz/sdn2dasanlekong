
const mongoose = require("mongoose");

const Mata_pelajaranSchema = new mongoose.Schema(
  { 
    nama_mapel:{type:String},
    images:{type:String},
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Mata_pelajaran = mongoose.model("Mata_pelajaran", Mata_pelajaranSchema);

module.exports = {
  Mata_pelajaran,
};
    
