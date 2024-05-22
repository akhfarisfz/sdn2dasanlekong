
/**
 * These naming rules follow the following pattern:
 * 
 *  TugasValidator<YourValidationPurpose>
 * 
 * For example:
 *  const TugasValidationEmailExist = (value, { req }) => {}
 **/

const TugasValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  TugasValidator,
};
