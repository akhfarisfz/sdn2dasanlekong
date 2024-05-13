const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nomor_induk:{type:String},
    roles: { type: String, enum: ['Admin', 'Guru', 'Siswa'], default: 'Admin', required: false },
    nama_lengkap: { type: String },
    tanggal_lahir: { type: Date },
    jenis_kelamin: { type: String, enum: ['Pria', 'Wanita'] },
    alamat: { type: String },
    pictureUrl: { type: String },
    // guru: {
    //   nip: { type: Number,required:false },
    // },
    // siswa: {
    //   nis: { type: Number,require:false},
    // },
    created: { type: Date, default: Date.now },

  },
  { versionKey: false }
);


const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
