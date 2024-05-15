const { LibAuthenticationMiddleware } = require("../../libs/authentications");
const {
  LibValidationsMiddleware,
  LibValidationFields,
  LibValidationExceptionMiddleware,
} = require("../../libs/validations");
const { UserSanitizerPasswordHash } = require("./sanitizers");
const {
  UserValidatiorUsernameUnique,
  UserValidatorEmailUnique,
  UserValidatorSignIn,
  UserValidatorCheckPassword,
} = require("./validators");

const UserMiddlewareList = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);
const UserMiddlewareUpdate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */
  LibValidationExceptionMiddleware
);
const UserMiddlewareDetail = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);
const UserMiddlewareDelete = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const UserMiddlewareSignUp = LibValidationsMiddleware(
  LibValidationFields.CharField({
    field: "username",
    customs: [UserValidatiorUsernameUnique],
  }),
  LibValidationFields.CharField({
    field: "email",
    customs: [UserValidatorEmailUnique],
  }),
  LibValidationFields.CharField({
    field: "password",
    sanitizers: [UserSanitizerPasswordHash],
  }),
  LibValidationFields.ChoicesValidator({
    field: "roles",
    choices: ["Admin", "Guru", "Siswa"],
    default: "Admin",
  }),

  LibValidationFields.CharField({ field: "nama_lengkap" }),
  LibValidationFields.CharField({ field: "nomor_induk" }),
  LibValidationFields.DateField({ field: "tanggal_lahir" }),
  LibValidationFields.ChoicesValidator({
    field: "jenis_kelamin",
    choices: ["Pria", "Wanita"],
  }),
  LibValidationFields.CharField({ field: "alamat" }),

  // (req, res, next) => {
  //   const { roles } = req.body;
  //   if (roles === 'Guru') {
  //     LibValidationFields.ObjectField({ field: "guru" })(req, res, next);
  //     LibValidationFields.CharField({ field: "guru.nip" })(req, res, next);
  //   } else if (roles === 'Siswa') {
  //     LibValidationFields.ObjectField({ field: "siswa" })(req, res, next);
  //     LibValidationFields.CharField({ field: "siswa.nis" })(req, res, next);
  //   } else {
  //     next();
  //   }
  // },
  LibValidationExceptionMiddleware
);

const UserMiddlewareSignIn = LibValidationsMiddleware(
  LibValidationFields.CharField({
    field: "email",
    customs: [UserValidatorSignIn],
  }),
  LibValidationFields.CharField({
    field: "password",
    customs: [UserValidatorCheckPassword],
  }),
  LibValidationExceptionMiddleware
);

module.exports = {
  UserMiddlewareSignUp,
  UserMiddlewareSignIn,
  UserMiddlewareList,
  UserMiddlewareDelete,
  UserMiddlewareUpdate,
  UserMiddlewareDetail,
};
