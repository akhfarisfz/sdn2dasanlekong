
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Mata_pelajaran } = require("./models");

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
    // Your code here
    res.status(201).json({
      controller: "Mata_pelajaranControllerCreate",
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Mata_pelajaranControllerDetail = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "Mata_pelajaranControllerDetail",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Mata_pelajaranControllerUpdate = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "Mata_pelajaranControllerUpdate",
      params: req.params,
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Mata_pelajaranControllerDelete = async (req, res) => {
  try {
    // Your code here
    res.status(204).json({
      controller: "Mata_pelajaranControllerDelete",
      params: req.params
    });
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
