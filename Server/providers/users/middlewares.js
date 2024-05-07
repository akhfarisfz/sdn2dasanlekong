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
  LibValidationFields.CharField({
    field: "profile.firstName",
    required: false,
  }),
  LibValidationFields.CharField({ field: "profile.lastName", required: false }),
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
  UserMiddlewareDetail
};
