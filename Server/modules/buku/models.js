
const mongoose = require("mongoose");

const BukuSchema = new mongoose.Schema(
  { 
    title:{type:String,required:true},
    description: {type:String},
    filePath:{type:String},
    created: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Buku = mongoose.model("Buku", BukuSchema);

module.exports = {
  Buku,
};
    
