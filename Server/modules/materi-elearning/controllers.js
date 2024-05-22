
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { MateriElearning } = require("./models");
const { MateriElearningFilter } = require("./filters");

const MateriElearningControllerList =  async (req, res) => {
  try {
    
    const results = MateriElearning.find(MateriElearningFilter(req));
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const MateriElearningControllerCreate = async (req, res) => {
  try {
    await MateriElearning.create(req.cleanedData);
    res.status(201).json(req.cleanedData);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const MateriElearningControllerDetail = async (req, res) => {
  try {
    let elearning = await MateriElearning.findOne({ _id: req.params.id });
    if (!elearning) throw { status: 404, message: "Not found" };
    res.status(200).json(elearning);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const MateriElearningControllerUpdate = async (req, res) => {
  try {
    // Your code here
    let elearning = await MateriElearning.findOne({ _id: req.params.id });
    if (!elearning) throw { status: 404, message: "Not found" };

    await MateriElearning.findByIdAndUpdate(req.params.id, req.cleanedData);
    res.status(200).json(req.cleanedData);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const MateriElearningControllerDelete = async (req, res) => {
  try {
    let elearning = await MateriElearning.findOne({ _id: req.params.id });
    if (!elearning) throw { status: 404, message: "Not found" };
    await MateriElearning.findByIdAndDelete(req.params.id);
    res.status(204).json(null);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  MateriElearningControllerList,
  MateriElearningControllerCreate,
  MateriElearningControllerDetail,
  MateriElearningControllerUpdate,
  MateriElearningControllerDelete,
};
