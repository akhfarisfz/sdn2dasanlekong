
const { LibPaginationResponse } = require("../../libs/paginations");
const { LibHTTPResponseException } = require("../../libs/https");
const { Siswa } = require("./models");
const { SiswaFilter } = require("./filters");
const { User } = require("../../providers/users/models");

const SiswaControllerList =  async (req, res) => {
  try {
    // Your code here
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
    console.log(userData); // Pastikan data sudah dibersihkan sebelumnya
    await Siswa.create(req.cleanedData); // Buat entri baru di database
    await User.create(userData); // Buat entri baru di database
    return res.status(201).json(req.cleanedData); // Kirimkan respons sukses dengan data yang baru dibuat
  } catch (error) {
    return LibHTTPResponseException(res, error); // Tangani kesalahan dengan baik
  }
}


const SiswaControllerDetail = async (req, res) => {
  try {
    let siswa = await Siswa.findOne({ _id: req.params.id });
    if (!siswa) throw { status: 404, message: "Not found" };
    res.status(200).json(siswa);
    return res.status(200).json(siswa); // Mengirimkan respons sukses dengan data siswa
  } catch (error) {
    return LibHTTPResponseException(res, error); // Menangani kesalahan dengan baik
  }
}


const SiswaControllerUpdate = async (req, res) => {
  try {
    let siswa = await Siswa.findOne({ _id: req.params.id });
    if (!siswa) throw { status: 404, message: "Not found" };

    await Siswa.findByIdAndUpdate(req.params.id, req.cleanedData);
    return res.status(200).json(siswa); // Mengirimkan respons sukses dengan data siswa yang diperbarui
  } catch (error) {
    return LibHTTPResponseException(res, error); // Menangani kesalahan dengan baik
  }
}


const SiswaControllerDelete = async (req, res) => {
  try {
    let siswa = await Siswa.findOne({ _id: req.params.id });
    if (!siswa) throw { status: 404, message: "Not found" };
    await Siswa.findByIdAndDelete(req.params.id);
    res.status(204).json(null);
    return res.status(200).json(siswa); // Mengirimkan respons sukses dengan data siswa yang diperbarui
  } catch (error) {
    return LibHTTPResponseException(res, error); // Menangani kesalahan dengan baik
  }
}

module.exports = {
  SiswaControllerList,
  SiswaControllerCreate,
  SiswaControllerDetail,
  SiswaControllerUpdate,
  SiswaControllerDelete,
};
