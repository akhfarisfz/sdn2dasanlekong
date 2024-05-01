const { LibAuthenticationMakeJWT } = require("../../libs/authentications");
const {
  LibHTTPResponseException
} = require("../../libs/https");
const { User } = require("./models");

// const UserControllerSignUp = async (req, res) => {
//   try {
//     await User.create(req.cleanedData);
//     const { password, ...payloadResponse } = req.cleanedData;
//     return res.status(200).json(payloadResponse);
//   } catch (error) {
//     return LibHTTPResponseException(res, error);
//   }
// };
const UserControllerSignUp = async (req, res) => {
  try {
    // Memasukkan peran yang dipilih ke dalam data pengguna
    const userData = { ...req.cleanedData, roles: req.body.roles };
    if (!userData.roles) {
      // Jika peran tidak ditentukan, set peran menjadi 'Admin'
      userData.roles = ['Admin'];
    }
    // Membuat pengguna baru
    await User.create(userData);

    // Menghapus password dari respons yang dikembalikan
    const { password, ...payloadResponse } = userData;

    // Mengembalikan respons
    return res.status(200).json(payloadResponse);
  } catch (error) {
    // Menangani kesalahan
    return LibHTTPResponseException(res, error);
  }
};


const UserControllerSignIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.cleanedData.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const tokenPayload = {
      id: user._id,
      email: user.email,
      roles: user.roles 
    };

    const token = LibAuthenticationMakeJWT(tokenPayload);
    return res.status(200).json({ token, roles: user.roles }); // Menyertakan peran dalam respons JSON
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};


module.exports = {
  UserControllerSignUp,
  UserControllerSignIn,
};
