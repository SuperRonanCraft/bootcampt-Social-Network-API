const router = require("express").Router();
const {
  getThought,
  addThought,
  getThoughts,
  //Reactions
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts).post(addThought);
router.route("/:id").get(getThought);
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
