
const mongoose = require("mongoose");

const GuruSchema = new mongoose.Schema(
  {
    nip: { type: Number },
    nama_lengkap: { type: String },
    tanggal_lahir: { type: Date },
    jenis_kelamin: { type: String, enum: ['Pria', 'Wanita'], default: 'Pria' },
    alamat: { type: String },
    pictureUrl: { type: String },
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Guru = mongoose.model("Guru", GuruSchema);

module.exports = {
  Guru,
};

