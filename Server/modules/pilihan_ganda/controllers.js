
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");

const Pilihan_gandaControllerList =  async (req, res) => {
  try {
    // Your code here

    // example:
    // const results = YourModel.find(YourFilter(req));
    // return LibPaginationResponse(req, res, results);


    res.status(201).json({
      controller: "Pilihan_gandaControllerList",
      query: req.query
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Pilihan_gandaControllerCreate = async (req, res) => {
  try {
    // Your code here
    res.status(201).json({
      controller: "Pilihan_gandaControllerCreate",
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Pilihan_gandaControllerDetail = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "Pilihan_gandaControllerDetail",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Pilihan_gandaControllerUpdate = async (req, res) => {
  try {
    // Your code here
    res.status(200).json({
      controller: "Pilihan_gandaControllerUpdate",
      params: req.params,
      body: req.body
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const Pilihan_gandaControllerDelete = async (req, res) => {
  try {
    // Your code here
    res.status(204).json({
      controller: "Pilihan_gandaControllerDelete",
      params: req.params
    });
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

module.exports = {
  Pilihan_gandaControllerList,
  Pilihan_gandaControllerCreate,
  Pilihan_gandaControllerDetail,
  Pilihan_gandaControllerUpdate,
  Pilihan_gandaControllerDelete,
};
