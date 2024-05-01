
/**
 * These naming rules follow the following pattern:
 * 
 *  SiswaValidator<YourValidationPurpose>
 * 
 * For example:
 *  const SiswaValidationEmailExist = (value, { req }) => {}
 **/

const SiswaValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  SiswaValidator,
};
