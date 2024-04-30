const { Thought, User } = require("../models");
function getThoughts(req, res) {
  Thought.find({}).then((data) => {
    res.json(data);
  });
}

async function addThought(req, res) {
  try {
    //Find current user by username
    const user = await User.findById(req.body.userId);
    if (user) {
      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: user.username,
        userId: user._id,
      });
      // Find another user document and add thought
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } }
        // { new: true }
      );
      res.json({ message: "Thought created!", thought });
    } else {
      res.status(404).json({ message: "Invalid username!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to create thought!" });
  }
}

function getThought(req, res) {
  Thought.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: "Invalid thought id!" });
    });
}

async function deleteThought(req, res) {
  try {
    const thought = await Thought.findById(req.params.id);
    if (thought) {
      await Thought.deleteOne(thought);
      const user = await User.findByIdAndUpdate(thought.userId, {
        $pull: { thoughts: thought._id },
      });
      res
        .status(200)
        .json({ message: "Deleted thought", deleted: thought, from: user });
    } else {
      res.status(404).json({ message: "Invalid thought id!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to delete thought!" });
  }
}

async function getReactions(req, res) {
  try {
    const thought = await Thought.findById(req.params.id);
    res.json(thought.reactions);
  } catch (err) {
    res.status(404).json({ message: "Invalid thoughtId!" });
  }
}

async function addReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reactions: req.body },
      },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    res.status(404).json({ message: "Invalid thoughtId!" });
  }
}

async function deleteReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $pull: { reactions: { _id: req.params.reactionId } },
      },
      { new: true }
    );
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Invalid thoughtId or reactionId!" });
  }
}

module.exports = {
  getThoughts,
  addThought,
  getThought,
  deleteThought,
  //Reactions
  getReactions,
  addReaction,
  deleteReaction,
};
