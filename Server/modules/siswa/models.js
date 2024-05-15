
const mongoose = require("mongoose");

const SiswaSchema = new mongoose.Schema(
  { 
    nis: { type: String, unique: true, required: true },
    user:{
      _id:{type:Object, required:false},
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }, 
      roles: { type: String, default:'Siswa'},
    },
    nama_lengkap: { type: String },
    tanggal_lahir: { type: Date },
    jenis_kelamin: { type: String, enum: ['Pria', 'Wanita'], default: 'Pria' },
    alamat: { type: String }, 
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Siswa = mongoose.model("Siswa", SiswaSchema);

module.exports = {
  Siswa,
};
    
