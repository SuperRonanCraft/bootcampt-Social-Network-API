const router = require("express").Router();
const {
  getThought,
  addThought,
  getThoughts,
  deleteThought,
  //Reactions
  getReactions,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

router.route("/").get(getThoughts).post(addThought);
router.route("/:id").get(getThought).delete(deleteThought);
router.route("/:id/reactions").get(getReactions).post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
