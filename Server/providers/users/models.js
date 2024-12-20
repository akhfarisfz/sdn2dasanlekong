const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    roles: { type: String, enum: ['Admin', 'Guru', 'Siswa'], default: 'Admin', required: false },
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);


const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
