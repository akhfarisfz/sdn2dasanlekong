
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Guru } = require("./models");
const { User } = require("../../providers/users/models");
const { GuruFilter } = require("./filters");

const GuruControllerList =  async (req, res) => {
  try {
    // Your code here
    const results = Guru.find(GuruFilter(req));
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const GuruControllerCreate = async (req, res) => {
  try {
    const userData = {
      username: req.cleanedData.user.username,
      email: req.cleanedData.user.email,
      password: req.cleanedData.user.password,
      roles: req.cleanedData.user.roles
    };
    await Guru.create(req.cleanedData); // Buat entri baru di database
    await User.create(userData); // Buat entri baru di database
    console.log(userData._id); // Pastikan data sudah dibersihkan sebelumnya
    return res.status(201).json(req.cleanedData); // Kirimkan respons sukses dengan data yang baru dibuat
  } catch (error) {
    return LibHTTPResponseException(res, error); // Tangani kesalahan dengan baik
  }
}

const GuruControllerDetail = async (req, res) => {
  try {
    let guru = await Guru.findOne({ _id: req.params.id });
    if (!guru) throw { status: 404, message: "Not found" };
    res.status(200).json(guru);
    return res.status(200).json(guru); // Mengirimkan respons sukses dengan data siswa
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
}

const GuruControllerUpdate = async (req, res) => {
  try {
    let guru = await Guru.findOne({ _id: req.params.id });
    if (!karyawan) throw { status: 404, message: "Not found" };

    await Guru.findByIdAndUpdate(req.params.id, req.cleanedData);
    return res.status(200).json(guru); // Mengirimkan respons sukses dengan data siswa yang diperbarui
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
