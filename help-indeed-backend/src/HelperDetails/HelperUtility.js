const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { serialize } = require("cookie");
// const HTTP_STATUS_CODES = require("http-status-enum")

const { secretKey } = require("../../config");
const {
  registerHelperDB,
  validHelperDB,
  loginHelperDB,
  getHelperDetailsDB,
} = require("./DbAccessor");
const {
  getEmailFromToken,
  isNOTNULLEMPTYORUNDEFINED,
} = require("../Common/Utility");

const registerHelper = async (req, res) => {
  const hashedPasword = bcrypt.hashSync(req.body.password, 8);
  req.body.password = hashedPasword;
  try {
    const validity = await validHelperDB(req.body);
    if (validity != 0) {
      return res.status(201).send({ response: "Helper already registered" });
    }
    await registerHelperDB(req.body);
    const payLoad = {
      email: req.body.email_id,
    };
    const token = jwt.sign(payLoad, secretKey, {
      expiresIn: 60 * 60 * 24 * 7,
    });
    const serialized = serialize("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    const helper = req.body;
    delete helper.password;
    res.status(200).send({
      success: true,
      auth: true,
      data: helper,
    });
  } catch (error) {
    return res.status(500).send("There was a problem registering the helper.");
  }
};

const loginHelper = async (req, res) => {
  try {
    const helperInDB = await loginHelperDB(req.body.email_id);
    if (helperInDB.length === 0) {
      return res.status(201).send({
        status: "error",
        error: "Helper not found !",
      });
    }
    bcrypt
      .compare(req.body.password, helperInDB[0].password)
      .then((isMatch) => {
        if (isMatch) {
          const payLoad = {
            email: req.body.email_id,
          };
          const token = jwt.sign(payLoad, secretKey, {
            expiresIn: 60 * 60 * 24 * 7,
          });
          const serialized = serialize("token", token, {
            // httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          res.setHeader("Set-Cookie", serialized);
          res.status(200).json({
            success: true,
            auth: true,
            data: req.body.email_id,
          });
        } else {
          res.status(201).json({
            status: "error",
            error: "Password and email does not match.",
          });
        }
      });
  } catch (error) {
    return res.status(500).send("There was a problem loging in the helper.");
  }
};

const logoutHelper = (req, res) => {
  const token = req.headers.cookie.split("=")[1];
  if (!token) {
    return res.status(401).json({
      status: "error",
      error: "Unauthorized",
    });
  }

  const serialized = serialize("token", null, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", serialized);
  res.status(200).json({
    status: "success",
    message: "Logged out",
  });
};

const getHelperProfileDetails = async (req, res) => {
  const token = req.headers.cookie.split("=")[1];
  const email = getEmailFromToken(token);
  if (!isNOTNULLEMPTYORUNDEFINED(email)) {
    return res
      .status(500)
      .send({ errorMessage: "Error extracting email from token" });
  }
  try {
    const details = await getHelperDetailsDB(email);
    console.log(details[0]);
    return res.status(200).json({
      status: "success",
      data: details[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "no user found",
    });
  }
};

module.exports = {
  registerHelper,
  getHelperProfileDetails,
  loginHelper,
  logoutHelper,
};
