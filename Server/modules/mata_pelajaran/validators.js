
/**
 * These naming rules follow the following pattern:
 * 
 *  Mata_pelajaranValidator<YourValidationPurpose>
 * 
 * For example:
 *  const Mata_pelajaranValidationEmailExist = (value, { req }) => {}
 **/

const Mata_pelajaranValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  Mata_pelajaranValidator,
};
