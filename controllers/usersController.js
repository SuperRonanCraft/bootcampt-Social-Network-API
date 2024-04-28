const { Users } = require("../models");
function getUsers(req, res) {
  Users.find({}).then((data) => {
    res.json(data);
  });
}

function addUsers(req, res) {
  Users.create(req.body).then((data) => {
    res.json({ message: "User Created", data });
  });
}

module.exports = { getUsers, addUsers };
