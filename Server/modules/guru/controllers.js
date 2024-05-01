
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");

const GuruControllerList =  async (req, res) => {
  try {
    // Your code here

    // example:
    // const results = YourModel.find(YourFilter(req));
    // return LibPaginationResponse(req, res, results);


    res.status(201).json({
      controller: "GuruControllerList",
      query: req.query
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const GuruControllerCreate = async (req, res) => {
  try {
    // Your code here
    res.status(201).json({
      controller: "GuruControllerCreate",
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const GuruControllerDetail = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "GuruControllerDetail",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const GuruControllerUpdate = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "GuruControllerUpdate",
      params: req.params,
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const GuruControllerDelete = async (req, res) => {
  try {
    // Your code here
    res.status(204).json({
      controller: "GuruControllerDelete",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  GuruControllerList,
  GuruControllerCreate,
  GuruControllerDetail,
  GuruControllerUpdate,
  GuruControllerDelete,
};
