
const mongoose = require("mongoose");

const Pilihan_gandaSchema = new mongoose.Schema(
  { 
    /** Your schema here */ 
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Pilihan_ganda = mongoose.model("Pilihan_ganda", Pilihan_gandaSchema);

module.exports = {
  Pilihan_ganda,
};
    
