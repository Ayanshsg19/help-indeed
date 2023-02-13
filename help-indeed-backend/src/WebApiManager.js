const { utilityEndpointBaseUrl } = require("../config");
const Axios = require("axios");

const apiGet = (url, token) => {
  try {
    let header = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    return Axios.get(utilityEndpointBaseUrl + url, { header });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  apiGet,
};
