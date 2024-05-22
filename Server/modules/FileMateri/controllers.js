
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { FileMateri } = require("./models");
const { FileMateriFilter } = require("./filters");

const FileMateriControllerList =  async (req, res) => {
  try {
    const results = FileMateri.find(FileMateriFilter(req));
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const FileMateriControllerCreate = async (req, res) => {
  try {
    await FileMateri.create(userData); // Buat entri baru di database
    return res.status(201).json(req.cleanedData); 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const FileMateriControllerDetail = async (req, res) => {
  try {
    let file = await FileMateri.findOne({ _id: req.params.id });
    if (!file) throw { status: 404, message: "Not found" };

    await FileMateri.findByIdAndUpdate(req.params.id, req.cleanedData);
    return res.status(200).json(file); 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const FileMateriControllerUpdate = async (req, res) => {
  try {
    let file = await FileMateri.findOne({ _id: req.params.id });
    if (!file) throw { status: 404, message: "Not found" };

    await FileMateri.findByIdAndUpdate(req.params.id, req.cleanedData);
    return res.status(200).json(file); 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const FileMateriControllerDelete = async (req, res) => {
  try {
    let file = await FileMateri.findOne({ _id: req.params.id });
    if (!file) throw { status: 404, message: "Not found" };

    await FileMateri.findByIdAndDelete(req.params.id, req.cleanedData);
    return res.status(200).json(file); 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  FileMateriControllerList,
  FileMateriControllerCreate,
  FileMateriControllerDetail,
  FileMateriControllerUpdate,
  FileMateriControllerDelete,
};
