
/**
 * These naming rules follow the following pattern:
 * 
 *  BukuValidator<YourValidationPurpose>
 * 
 * For example:
 *  const BukuValidationEmailExist = (value, { req }) => {}
 **/

const BukuValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  BukuValidator,
};
