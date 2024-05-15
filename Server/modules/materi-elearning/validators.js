
/**
 * These naming rules follow the following pattern:
 * 
 *  MateriElearningValidator<YourValidationPurpose>
 * 
 * For example:
 *  const MateriElearningValidationEmailExist = (value, { req }) => {}
 **/

const MateriElearningValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  MateriElearningValidator,
};
