const express = require("express");
const router = express.Router();
const { getAllLands, addLand, getLandDetails, updateLand, deleteLand, getTopLands } = require("../controllers/LandController");
const upload = require('../middleware/multer');

router.route("/landslist").get(getAllLands);
router.route('/addLand').post(upload.array('images', 5), addLand);
router.route("/landDetails/:id").get(getLandDetails);
router.route("/updateLand/:id").put(updateLand);
router.route("/deleteLand/:id").delete(deleteLand);
router.route("/getTopLands").get(getTopLands);
module.exports = router;