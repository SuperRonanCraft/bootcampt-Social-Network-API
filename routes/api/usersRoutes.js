const router = require("express").Router();
const {
  getUsers,
  addUsers,
  getUser,
  updateUser,
  deleteUser,
  //Friends
  addFriend,
} = require("../../controllers/usersController");

router.route("/").get(getUsers).post(addUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend);

module.exports = router;
