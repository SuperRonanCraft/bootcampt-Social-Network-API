const router = require("express").Router();
const { getSales } = require("../../controllers/salesController");

// // /api/courses
router.route("/").get(getSales);

module.exports = router;
