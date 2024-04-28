const { User } = require("../models");
function getUsers(req, res) {
  User.find({}).then((data) => {
    res.json(data);
  });
}

function addUsers(req, res) {
  User.create(req.body).then((data) => {
    res.json({ message: "User Created", data });
  });
}

function getUser(req, res) {
  User.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "Invalid user id!" });
    });
}

function updateUser(req, res) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((updated) => {
      res.json(updated);
    })
    .catch((err) => res.json({ message: "Invalid user id!" }));
}

function deleteUser(req, res) {
  User.findByIdAndDelete({ _id: req.params.id }).then((deleted) => {
    if (deleted) res.json({ message: "User deleted!", deleted });
    else res.json({ message: "Invalid user id!" });
  });
}

function addFriend(req, res) {
  User.findByIdAndUpdate(
    { _id: req.params.userId },
    { $push: { friends: req.params.friendId } },
    { new: true }
  ).then((updated) => {
    if (updated) res.json({ message: "User deleted!", updated });
    else res.json({ message: "Invalid user id!" });
  });
}

module.exports = {
  getUsers,
  addUsers,
  getUser,
  updateUser,
  deleteUser,
  //Friends
  addFriend,
};
