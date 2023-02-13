const { searchHelpersInDb, getTrustListDb } = require("./DbAccessor");
const { getEmailFromToken } = require("../Common/Utility");

const searchHelpers = async (req, res) => {
  const name = req.body.name;
  try {
    let response = await searchHelpersInDb(name);
    res.status(200).json({
      message: "Success",
      data: response,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Some error occured in finding user!" });
  }
};

const getTrustList = async (req, res) => {
  const token = req.headers.cookie.split("=")[1];
  const email = getEmailFromToken(token);
  try {
    let response = await getTrustListDb(email);
    res.status(200).json({
      message: "Success",
      data: response,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Some error occured in fetching the list!" });
  }
};

module.exports = {
  searchHelpers,
  getTrustList,
};
