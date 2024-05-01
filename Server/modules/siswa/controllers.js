
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");

const SiswaControllerList =  async (req, res) => {
  try {
    // Your code here

    // example:
    // const results = YourModel.find(YourFilter(req));
    // return LibPaginationResponse(req, res, results);


    res.status(201).json({
      controller: "SiswaControllerList",
      query: req.query
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const SiswaControllerCreate = async (req, res) => {
  try {
    // Your code here
    res.status(201).json({
      controller: "SiswaControllerCreate",
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const SiswaControllerDetail = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "SiswaControllerDetail",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const SiswaControllerUpdate = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "SiswaControllerUpdate",
      params: req.params,
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const SiswaControllerDelete = async (req, res) => {
  try {
    // Your code here
    res.status(204).json({
      controller: "SiswaControllerDelete",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  SiswaControllerList,
  SiswaControllerCreate,
  SiswaControllerDetail,
  SiswaControllerUpdate,
  SiswaControllerDelete,
};
