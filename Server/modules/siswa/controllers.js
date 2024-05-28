
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Siswa } = require("./models");
const { User } = require("../../providers/users/models");
const { SiswaFilter } = require("./filters");


const SiswaControllerList =  async (req, res) => {
  try {
    const results = Siswa.find(SiswaFilter(req));
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const SiswaControllerCreate = async (req, res) => {
  try {
    const userData = {
      username: req.cleanedData.user.username,
      email: req.cleanedData.user.email,
      password: req.cleanedData.user.password,
      roles: req.cleanedData.user.roles
    };
    console.log(req.cleanedData); 
    await Siswa.create(req.cleanedData); // Buat entri baru di database
    await User.create(userData); // Buat entri baru di database
    return res.status(201).json(req.cleanedData); // Kirimkan respons sukses dengan data yang baru dibuat
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
