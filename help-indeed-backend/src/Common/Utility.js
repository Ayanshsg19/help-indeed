const jwt = require("jsonwebtoken");
const { secretKey } = require("../../config");

const reviseError = (error) => {
  let statusCode, errorMessage;
  if (error.name === "REQUEST_ERROR") {
    statusCode = 400;
    errorMessage = error.message;
  } else if (error.name === "UNAUTHORIZED_ERROR") {
    statusCode = 401;
    errorMessage = error.message;
  } else if (error.response && error.response.data) {
    statusCode = 400;
    errorMessage = error.response.data;
  } else {
    statusCode = 500;
    errorMessage = "Internal Server Error";
  }
  return [statusCode, errorMessage];
};

const isNOTNULLEMPTYORUNDEFINED = (value) => {
  return !(value === null || value === undefined || value === "");
};

const getEmailFromToken = (token) => {
  return jwt.verify(token, secretKey, (err, data) => {
    if (err) {
      return "";
    }
    return data.email;
  });
};

module.exports = {
  reviseError,
  isNOTNULLEMPTYORUNDEFINED,
  getEmailFromToken,
};
