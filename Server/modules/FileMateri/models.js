const mongoose = require('mongoose');

const FileMateriSchema = new mongoose.Schema({
  nama_file: { type: String, required: true },
  url: { type: String, required: true },
  tipe_file: { type: String, required: true },
  ukuran_file: { type: Number, required: true } // ukuran file dalam bytes
}, { _id: false });

module.exports = mongoose.model('FileMateri', FileMateriSchema);

module.exports = {
  FileMateri,
};
    
