
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Jawabansiswa } = require("./models");
const { JawabansiswaFilter } = require("./filters");

const JawabansiswaControllerList =  async (req, res) => {
  try {
    const results = Jawabansiswa.find(JawabansiswaFilter(req));
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const JawabansiswaControllerCreate = async (req, res) => {
  try {
    await Jawabansiswa.create(req.cleanedData); // Buat entri baru di database
    return res.status(201).json(req.cleanedData);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const JawabansiswaControllerDetail = async (req, res) => {
  try {
    let jawaban_siswa = await Jawabansiswa.findOne({ _id: req.params.id });
    if (!jawaban_siswa) throw { status: 404, message: "Not found" };
    res.status(200).json(jawaban_siswa);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const JawabansiswaControllerUpdate = async (req, res) => {
  try {
    let jawaban_siswa = await Jawabansiswa.findOne({ _id: req.params.id });
    if (!jawaban_siswa) throw { status: 404, message: "Not found" };

    await Jawabansiswa.findByIdAndUpdate(req.params.id, req.cleanedData);
    return res.status(200).json(jawaban_siswa); // Mengirimkan respons sukses dengan 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const JawabansiswaControllerDelete = async (req, res) => {
  try {
    let jawaban_siswa = await Jawabansiswa.findOne({ _id: req.params.id });
    if (!jawaban_siswa) throw { status: 404, message: "Not found" };

    await Jawabansiswa.findByIdAndDelete(req.params.id, req.cleanedData);
    return res.status(200).json(jawaban_siswa); 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  JawabansiswaControllerList,
  JawabansiswaControllerCreate,
  JawabansiswaControllerDetail,
  JawabansiswaControllerUpdate,
  JawabansiswaControllerDelete,
};
