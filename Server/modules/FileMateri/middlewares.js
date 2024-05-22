
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

const FileMateriMiddlewareList = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const FileMateriMiddlewareDetail = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

const FileMateriMiddlewareCreate = LibValidationsMiddleware(
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
   *    customs: [FileMateriValidatorField3Unique],
   *  }),
   *  LibValidationFields.CharField({
   *    field: "field4",
   *    sanitizers: [FileMateriSanitizerField4ToHash],
   *  }),
   *  ...
   */
  LibValidationFields.CharField({ field: "nama_file" }),
  LibValidationFields.CharField({ field: "url" }),
  LibValidationFields.CharField({ field: "tipe_file" }),
  LibValidationFields.NumberField({ field: "ukuran_file" }),
  LibValidationExceptionMiddleware,
);

const FileMateriMiddlewareUpdate = LibValidationsMiddleware(
  LibAuthenticationMiddleware,
  /** Your middleware here (validations, sanitizing, etc..) */
  LibValidationExceptionMiddleware,
);

const FileMateriMiddlewareDelete = LibValidationsMiddleware(
  LibAuthenticationMiddleware
);

module.exports = {
  FileMateriMiddlewareCreate,
  FileMateriMiddlewareUpdate,
  FileMateriMiddlewareDetail,
  FileMateriMiddlewareList,
  FileMateriMiddlewareDelete,
};
  