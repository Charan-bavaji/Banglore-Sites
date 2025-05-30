const express = require("express");
const {
  Redirect_to_google,
  google_callback,
} = require("../controllers/AuthController");
const router = express.Router();

// router.route("/register").post(register);
router.route("/google").get(Redirect_to_google);
router.route("/google/callback").get(google_callback);

module.exports = router;
