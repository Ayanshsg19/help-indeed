const { EMAIL_REGEX } = require("../../constants");
const {
  isNOTNULLEMPTYORUNDEFINED,
  getEmailFromToken,
} = require("../Common/Utility");

const isTokenValid = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];
  if (isNOTNULLEMPTYORUNDEFINED(token)) {
    next();
  } else {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
};

const isEmailValid = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];
  const email = getEmailFromToken(token);
  let regexValidity = EMAIL_REGEX.test(String(email).toLocaleLowerCase());
  if (regexValidity) {
    next();
  } else {
    return res.status(400).send({ errorMessage: "Invalid email" });
  }
};

module.exports = {
  isEmailValid,
  isTokenValid,
};
