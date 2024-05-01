
const mongoose = require("mongoose");

const SiswaSchema = new mongoose.Schema(
  { 
    /** Your schema here */ 
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Siswa = mongoose.model("Siswa", SiswaSchema);

module.exports = {
  Siswa,
};
    
