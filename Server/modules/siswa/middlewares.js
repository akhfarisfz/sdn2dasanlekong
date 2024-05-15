
const { LibAuthenticationMiddleware } = require("../../libs/authentications");
const {
  LibValidationExceptionMiddleware,
  LibValidationFields,
  LibValidationsMiddleware,
} = require("../../libs/validations");
const { UserSanitizerPasswordHash } = require("../../providers/users/sanitizers");
const { UserValidatiorUsernameUnique, UserValidatorEmailUnique } = require("../../providers/users/validators");

/**
 * If you want to remove JWT authentication, 
 * you can remove 'LibAuthenticationMiddleware' from your middleware list.
 */

const SiswaMiddlewareList = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const SiswaMiddlewareDetail = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const SiswaMiddlewareCreate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */

  /**
   * "LibValidationExceptionMiddleware" is suitable for validating data sent by the client in body. 
   * If you have your own handler, you can replace it.
   * 
   * For example:
   *  ...
   *  LibValidationFields.CharField({ field: "field1" }),
   *  LibValidationFields.CharField({ field: "field2" }),
   *  LibValidationFields.CharField({
   *    field: "field3",
   *    customs: [SiswaValidatorField3Unique],
   *  }),
   *  LibValidationFields.CharField({
   *    field: "field4",
   *    sanitizers: [SiswaSanitizerField4ToHash],
   *  }),
   *  ...
   */
  LibValidationFields.CharField({ field: "nis", required: true, unique: true }),
  LibValidationFields.ObjectField({ field: "user" }),
  LibValidationFields.ObjectField({ field: "user._id",required:false }),
  LibValidationFields.CharField({
    field: "user.username",
    customs: [UserValidatiorUsernameUnique],
  }),
  LibValidationFields.CharField({
    field: "user.email",
    customs: [UserValidatorEmailUnique
    ],
  }),
  LibValidationFields.CharField({
    field: "user.password",
    sanitizers: [UserSanitizerPasswordHash],
  }),
  LibValidationFields.ChoicesValidator({
    field: "user.roles",
    choices: ['Admin', 'Guru', 'Siswa'],
    default:'Siswa'
  }),

  LibValidationFields.CharField({ field: "nama_lengkap" }),
  LibValidationFields.DateField({ field: "tanggal_lahir" }),
  LibValidationFields.ChoicesValidator({ field: "jenis_kelamin", choices: ['Pria', 'Wanita'] }),
  LibValidationFields.CharField({ field: "alamat" }),


  LibValidationExceptionMiddleware,
);

const SiswaMiddlewareUpdate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */
  LibValidationExceptionMiddleware,
);

const SiswaMiddlewareDelete = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

module.exports = {
  SiswaMiddlewareCreate,
  SiswaMiddlewareUpdate,
  SiswaMiddlewareDetail,
  SiswaMiddlewareList,
  SiswaMiddlewareDelete,
};
