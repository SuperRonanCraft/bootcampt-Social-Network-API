const { Thought, User } = require("../models");
function getThoughts(req, res) {
  Thought.find({}).then((data) => {
    res.json(data);
  });
}

async function addThought(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const thought = await Thought.create(req.body);
      // user.thoughts.push(thought._id);
      // await user.save();
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } }
      );
      res.json();
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
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "Invalid thought id!" });
    });
}

async function deleteThought(req, res) {
  try {
    const thought = await Thought.findById(req.params.id);
    if (thought) {
      await Thought.deleteOne(thought);
      const user = await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } }
      );
      res.json({ message: "Deleted thought", deleted: thought, from: user });
    } else {
      res.json({ message: "Invalid thought id!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to delete thought!" });
  }
}

function addReaction(req, res) {}
function deleteReaction(req, res) {}

module.exports = {
  getThoughts,
  addThought,
  getThought,
  deleteThought,
  //Reactions
  addReaction,
  deleteReaction,
};
