const router = require("express").Router();
const { getUsers, addUsers } = require("../../controllers/usersController");

router.route("/").get(getUsers).post(addUsers);

module.exports = router;
