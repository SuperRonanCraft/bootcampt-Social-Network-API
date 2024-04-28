const { Thought } = require("../models");
function getThoughts(req, res) {
  Thought.find({}).then((data) => {
    res.json(data);
  });
}

function addThought(req, res) {
  Thought.create(req.body).then((data) => {
    res.json({ message: "Added thought!", data });
  });
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

function addReaction() {}
function deleteReaction() {}

module.exports = {
  getThoughts,
  addThought,
  getThought,
  //Reactions
  addReaction,
  deleteReaction,
};
