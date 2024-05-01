
/**
 * These naming rules follow the following pattern:
 * 
 *  GuruValidator<YourValidationPurpose>
 * 
 * For example:
 *  const GuruValidationEmailExist = (value, { req }) => {}
 **/

const GuruValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  GuruValidator,
};
