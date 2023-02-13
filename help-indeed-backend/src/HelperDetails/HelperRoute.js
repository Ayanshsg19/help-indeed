const express = require("express");
const router = express.Router();

const {
  registerHelper,
  loginHelper,
  logoutHelper,
  getHelperProfileDetails,
} = require("./HelperUtility");
const { URIS } = require("./HelperConstants");
const { isTokenValid, isEmailValid } = require("../Middlewares/Validations");

router.post(URIS.REGISTER_HELPER, registerHelper);
router.post(URIS.LOGIN_HELPER, loginHelper);
router.get(URIS.LOGOUT_HELPER, [isTokenValid, isEmailValid], logoutHelper);
router.get(
  URIS.GET_HELPER_DETAILS,
  [isTokenValid, isEmailValid],
  getHelperProfileDetails
);

module.exports = router;
