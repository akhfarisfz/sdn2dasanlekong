
const mongoose = require("mongoose");

const GuruSchema = new mongoose.Schema(
  { 
    /** Your schema here */ 
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Guru = mongoose.model("Guru", GuruSchema);

module.exports = {
  Guru,
};
    
