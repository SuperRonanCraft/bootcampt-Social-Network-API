const router = require("express").Router();
const usersRoute = require("./usersRoutes");
const thoughtsRoute = require("./thoughtsRoutes");
const { User, Thought } = require("../../models");

router.use("/users", usersRoute);
router.use("/thoughts", thoughtsRoute);

//Delete all documents (mostly debugging)
router.delete("/reloadDatabase", async (req, res) => {
  await User.deleteMany({});
  await Thought.deleteMany({});
  res.status(200).json({ message: "Database deleted!" });
});

module.exports = router;
