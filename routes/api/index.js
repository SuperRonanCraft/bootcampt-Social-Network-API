const router = require("express").Router();
const usersRoute = require("./usersRoutes");
const thoughtsRoute = require("./thoughtsRoutes");

router.use("/users", usersRoute);
router.use("/thoughts", thoughtsRoute);

module.exports = router;
