const { LibAuthenticationMakeJWT } = require("../../libs/authentications");
const {
  LibHTTPResponseException
} = require("../../libs/https");
const { LibPaginationResponse } = require("../../libs/paginations");
const { UserFilter } = require("./filters");
const { User } = require("./models");
// };

const UserControllerList = async (req, res) => {
  try {
    const results = User.find(UserFilter(req));
    return LibPaginationResponse(req, res, results);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const UserControllerDetail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    return res.status(200).json(user);
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const UserControllerUpdate = async (req, res) => {
  try {
    throw { status: 403, message: "Not allowed" };
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const UserControllerDelete = async (req, res) => {
  try {
    // Your code here
    throw { status: 403, message: "Not allowed" };
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};

const UserControllerSignUp = async (req, res) => {
  try {
    const userData = { ...req.cleanedData, roles: req.body.roles };
    if (!userData.roles) {
      userData.roles = 'Admin';
    }
    
    await User.create(userData);

    const { password, ...payloadResponse } = userData;
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
    return res.status(200).json({ token
      , roles: user.roles
     }); // Menyertakan peran dalam respons JSON
  } catch (error) {
    return LibHTTPResponseException(res, error);
  }
};


module.exports = {
  UserControllerSignUp,
  UserControllerSignIn,
  UserControllerList,
  UserControllerDetail,
  UserControllerUpdate,
  UserControllerDelete
};
