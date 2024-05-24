
/**
 * These naming rules follow the following pattern:
 * 
 *  Pilihan_gandaValidator<YourValidationPurpose>
 * 
 * For example:
 *  const Pilihan_gandaValidationEmailExist = (value, { req }) => {}
 **/

const Pilihan_gandaValidator = (value, { req }) => {
  // Your validation here
  return value;
};

module.exports = {
  Pilihan_gandaValidator,
};
