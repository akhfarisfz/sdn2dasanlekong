
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Mata_pelajaran } = require("./models");
const { Mata_pelajaranFilter } = require("./filters");

const Mata_pelajaranControllerList =  async (req, res) => {
  try {
    const results = Mata_pelajaran.find(Mata_pelajaranFilter(req));
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Mata_pelajaranControllerCreate = async (req, res) => {
  try {
    await Mata_pelajaran.create(req.cleanedData); // Buat entri baru di database
    return res.status(201).json(req.cleanedData);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Mata_pelajaranControllerDetail = async (req, res) => {
  try {
    let matapelajaran = await Mata_pelajaran.findOne({ _id: req.params.id });
    if (!matapelajaran) throw { status: 404, message: "Not found" };
    res.status(200).json(matapelajaran);
    return res.status(200).json(matapelajaran); // Mengirimkan respons sukses dengan data siswa
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Mata_pelajaranControllerUpdate = async (req, res) => {
  try {
    let matapelajaran = await Mata_pelajaran.findOne({ _id: req.params.id });
    if (!matapelajaran) throw { status: 404, message: "Not found" };

    await Mata_pelajaran.findByIdAndUpdate(req.params.id, req.cleanedData);
    return res.status(200).json(matapelajaran); // Mengirimkan respons sukses dengan 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Mata_pelajaranControllerDelete = async (req, res) => {
  try {
    let matapelajaran = await Mata_pelajaran.findOne({ _id: req.params.id });
    if (!matapelajaran) throw { status: 404, message: "Not found" };

    await Mata_pelajaran.findByIdAndDelete(req.params.id, req.cleanedData);
    return res.status(200).json(matapelajaran); // Mengirimkan respons sukses dengan 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  Mata_pelajaranControllerList,
  Mata_pelajaranControllerCreate,
  Mata_pelajaranControllerDetail,
  Mata_pelajaranControllerUpdate,
  Mata_pelajaranControllerDelete,
};
