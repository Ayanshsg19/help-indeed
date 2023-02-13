const express = require("express");
const router = express.Router();

const { searchHelpers, getTrustList } = require("./TrustListUtility");
const { URIS } = require("./TrustListConstants");
const { isTokenValid, isEmailValid } = require("../Middlewares/Validations");

router.post(URIS.SEARCH_HELPER, searchHelpers);
router.get(URIS.TRUST_LIST, getTrustList);

module.exports = router;
