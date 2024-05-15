
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");

const MateriElearningControllerList =  async (req, res) => {
  try {
    // Your code here

    // example:
    // const results = YourModel.find(YourFilter(req));
    // return LibPaginationResponse(req, res, results);


    res.status(201).json({
      controller: "MateriElearningControllerList",
      query: req.query
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const MateriElearningControllerCreate = async (req, res) => {
  try {
    // Your code here
    res.status(201).json({
      controller: "MateriElearningControllerCreate",
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const MateriElearningControllerDetail = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "MateriElearningControllerDetail",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const MateriElearningControllerUpdate = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "MateriElearningControllerUpdate",
      params: req.params,
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const MateriElearningControllerDelete = async (req, res) => {
  try {
    // Your code here
    res.status(204).json({
      controller: "MateriElearningControllerDelete",
      params: req.params
    });
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
