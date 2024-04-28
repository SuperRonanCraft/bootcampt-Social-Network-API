const router = require("express").Router();
const {
  getUsers,
  addUsers,
  getUser,
} = require("../../controllers/usersController");

router.route("/").get(getUsers).post(addUsers);
router.route("/:id").get(getUser);

module.exports = router;
