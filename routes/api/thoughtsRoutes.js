const router = require("express").Router();
const {
  getThought,
  addThought,
  getThoughts,
} = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts).post(addThought);
router.route("/:id").get(getThought);

module.exports = router;
