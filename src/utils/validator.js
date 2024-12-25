const validator = require("validator");

const validateFunction = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("enter first And Last names");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("please enter EmailID ");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(" please enter a strong password !!");
  }
};

module.exports = validateFunction;
