
/**
 * These naming rules follow the following pattern:
 * 
 *  FileMateriValidator<YourValidationPurpose>
 * 
 * For example:
 *  const FileMateriValidationEmailExist = (value, { req }) => {}
 **/

const FileMateriValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  FileMateriValidator,
};
