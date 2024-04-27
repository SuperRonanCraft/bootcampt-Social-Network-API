const router = require("express").Router();
const salesRoute = require("./salesRoute");

router.use("/sales", salesRoute);

module.exports = router;
