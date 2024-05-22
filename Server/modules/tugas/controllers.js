
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Tugas } = require("./models");
const { TugasFilter } = require("./filters");

const TugasControllerList =  async (req, res) => {
  try {
    const results = Tugas.find(TugasFilter(req));
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const TugasControllerCreate = async (req, res) => {
  try {
    await Tugas.create(req.cleanedData);
    res.status(201).json(req.cleanedData);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const TugasControllerDetail = async (req, res) => {
  try {
    let tugas = await Tugas.findOne({ _id: req.params.id });
    if (!tugas) throw { status: 404, message: "Not found" };
    res.status(200).json(tugas);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const TugasControllerUpdate = async (req, res) => {
  try {
    let tugas = await Tugas.findOne({ _id: req.params.id });
    if (!tugas) throw { status: 404, message: "Not found" };
    
    await MateriElearning.findByIdAndUpdate(req.params.id, req.cleanedData);
    res.status(200).json(req.cleanedData);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const TugasControllerDelete = async (req, res) => {
  try {
    let tugas = await Tugas.findOne({ _id: req.params.id });
    if (!tugas) throw { status: 404, message: "Not found" };
    
    await MateriElearning.findByIdAndDelete(req.params.id, req.cleanedData);
    res.status(200).json(req.cleanedData);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  TugasControllerList,
  TugasControllerCreate,
  TugasControllerDetail,
  TugasControllerUpdate,
  TugasControllerDelete,
};
