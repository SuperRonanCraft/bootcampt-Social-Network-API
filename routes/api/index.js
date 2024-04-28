const router = require("express").Router();
const usersRoute = require("./usersRoutes");

router.use("/users", usersRoute);

module.exports = router;
