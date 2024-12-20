
const { LibAuthenticationMiddleware } = require("../../libs/authentications");
const {
  LibValidationExceptionMiddleware,
  LibValidationFields,
  LibValidationsMiddleware,
} = require("../../libs/validations");

/**
 * If you want to remove JWT authentication, 
 * you can remove 'LibAuthenticationMiddleware' from your middleware list.
 */

const MateriElearningMiddlewareList = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const MateriElearningMiddlewareDetail = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const MateriElearningMiddlewareCreate = LibValidationsMiddleware(
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
   *    customs: [MateriElearningValidatorField3Unique],
   *  }),
   *  LibValidationFields.CharField({
   *    field: "field4",
   *    sanitizers: [MateriElearningSanitizerField4ToHash],
   *  }),
   *  ...
   */
  LibValidationFields.CharField({ field: "id_guru" }),
  LibValidationFields.CharField({ field: "judul" }),
  LibValidationFields.CharField({ field: "deskripsi" }),
  LibValidationFields.CharField({ field: "kelas" }),
  LibValidationFields.CharField({ field: "url_file_materi" }),
  LibValidationFields.ObjectField({ field: "mata_pelajaran" }),
  LibValidationFields.CharField({ field: "mata_pelajaran.nama_mapel" }),
  LibValidationExceptionMiddleware,
);

const MateriElearningMiddlewareUpdate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */
  LibValidationExceptionMiddleware,
);

const MateriElearningMiddlewareDelete = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

module.exports = {
  MateriElearningMiddlewareCreate,
  MateriElearningMiddlewareUpdate,
  MateriElearningMiddlewareDetail,
  MateriElearningMiddlewareList,
  MateriElearningMiddlewareDelete,
};
  