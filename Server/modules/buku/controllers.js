
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Buku } = require("./models");
const { BukuFilter } = require("./filters");

const BukuControllerList =  async (req, res) => {
  try {
    const results = Buku.find(BukuFilter(req));
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const BukuControllerCreate = async (req, res) => {
  try {
    await Buku.create(req.cleanedData); // Buat entri baru di database
    return res.status(201).json(req.cleanedData); 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const BukuControllerDetail = async (req, res) => {
  try {
    let file = await Buku.findOne({ _id: req.params.id });
    if (!file) throw { status: 404, message: "Not found" };

    await Buku.findByIdAndUpdate(req.params.id, req.cleanedData);
    return res.status(200).json(file); 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const BukuControllerUpdate = async (req, res) => {
  try {
    let file = await Buku.findOne({ _id: req.params.id });
    if (!file) throw { status: 404, message: "Not found" };

    await Buku.findByIdAndUpdate(req.params.id, req.cleanedData);
    return res.status(200).json(file); 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const BukuControllerDelete = async (req, res) => {
  try {
    let file = await Buku.findOne({ _id: req.params.id });
    if (!file) throw { status: 404, message: "Not found" };

    await Buku.findByIdAndDelete(req.params.id, req.cleanedData);
    return res.status(200).json(file); 
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  BukuControllerList,
  BukuControllerCreate,
  BukuControllerDetail,
  BukuControllerUpdate,
  BukuControllerDelete,
};
