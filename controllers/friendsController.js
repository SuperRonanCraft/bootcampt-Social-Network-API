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
  User.findById(req.params.id).then((data) => {
    res.json(data);
  });
}

module.exports = { getUsers, addUsers, getUser };
