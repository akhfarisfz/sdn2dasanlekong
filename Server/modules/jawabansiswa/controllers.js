
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");

const JawabansiswaControllerList =  async (req, res) => {
  try {
    // Your code here

    // example:
    // const results = YourModel.find(YourFilter(req));
    // return LibPaginationResponse(req, res, results);


    res.status(201).json({
      controller: "JawabansiswaControllerList",
      query: req.query
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const JawabansiswaControllerCreate = async (req, res) => {
  try {
    // Your code here
    res.status(201).json({
      controller: "JawabansiswaControllerCreate",
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const JawabansiswaControllerDetail = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "JawabansiswaControllerDetail",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const JawabansiswaControllerUpdate = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "JawabansiswaControllerUpdate",
      params: req.params,
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const JawabansiswaControllerDelete = async (req, res) => {
  try {
    // Your code here
    res.status(204).json({
      controller: "JawabansiswaControllerDelete",
      params: req.params
    });
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
