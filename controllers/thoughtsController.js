const { Thought, User } = require("../models");

//Get ALL thoughts
function getThoughts(req, res) {
  Thought.find({}).then((data) => {
    res.json(data);
  });
}

//Add a thought via its text
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

//Update a thoughts text or anything else
function updateThought(req, res) {
  Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Invalid thought id" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "Unable to update thought!" });
    });
}

//Get a singular thoughts data
function getThought(req, res) {
  Thought.findById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: "Invalid thought id!" });
    });
}

//Delete a thought by its id
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

//Get all reactions on a thought
async function getReactions(req, res) {
  try {
    const thought = await Thought.findById(req.params.id);
    res.json(thought.reactions);
  } catch (err) {
    res.status(404).json({ message: "Invalid thoughtId!" });
  }
}

//Add a reaction to a thought
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

//Delete a reaction by its thought and id
async function deleteReaction(req, res) {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $pull: { reactions: { _id: req.params.reactionId } },
      },
      { new: true }
    );
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({ message: "Invalid thoughtId!" });
    }
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
  updateThought,
  //Reactions
  getReactions,
  addReaction,
  deleteReaction,
};
