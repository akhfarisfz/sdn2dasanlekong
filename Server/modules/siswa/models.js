
const mongoose = require("mongoose");

const SiswaSchema = new mongoose.Schema(
  {
    nis: { type: Number },
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Siswa = mongoose.model("Siswa", SiswaSchema);

module.exports = {
  Siswa,
};

