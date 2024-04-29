const { User } = require("../models");
function getUsers(req, res) {
  User.find({}).then((data) => {
    res.json(data);
  });
}

function addUsers(req, res) {
  User.create(req.body)
    .then((user) => {
      res.json({ message: "User Created", user });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: "Error creating user, duplicate username?" });
    });
}

//Get basic users data
function getUser(req, res) {
  User.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "Invalid user id!" });
    });
}

//Update a users... anything, username, email, thoughts and friends if you are brave
function updateUser(req, res) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((updated) => {
      res.json(updated);
    })
    .catch((err) => res.json({ message: "Invalid user id!" }));
}

//Delete a user by their ID
function deleteUser(req, res) {
  User.findByIdAndDelete({ _id: req.params.id }).then((deleted) => {
    if (deleted) res.json({ message: "User deleted!", deleted });
    else res.json({ message: "Invalid user id!" });
  });
}

//Get a user and populate their friends info
async function getFriends(req, res) {
  try {
    User.findById(req.params.id)
      .lean() //Used to disable vituals
      .populate("friends", "-friends -thoughts -__v")
      .then((data) => {
        res.json(data);
      });
  } catch (err) {
    res.status(404).json({ message: "Invalid userId!" });
  }
}

async function addFriend(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    const friending = await User.findById(req.params.friendId);
    //Friending self?
    if (user._id === friending._id) {
      res.json({ message: "Cannot friend yourself!" });
      return;
    }
    //Already friends?
    if (user.friends.indexOf(friending._id) != -1) {
      res.json({ message: `Already friends with ${friending.username}` });
      return;
    }
    //Add friend to users friend list
    await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        res.json({ message: "Added to friends list!", user });
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    //Add friend to other users friends list
    await User.findByIdAndUpdate(req.params.friendId, {
      $push: { friends: req.params.userId },
    });
  } catch (err) {
    console.log(err);
  }
}

async function deleteFriend(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    const friending = await User.findById(req.params.friendId);
    //Friending self?
    if (user._id === friending._id) {
      res.json({ message: "Cannot friend yourself!" });
      return;
    }
    //Already friends?
    if (user.friends.indexOf(friending._id) != -1) {
      res.json({ message: `Already friends with ${friending.username}` });
      return;
    }
    //Add friend to users friend list
    await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        res.json({ message: "Added to friends list!", user });
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    //Add friend to other users friends list
    await User.findByIdAndUpdate(req.params.friendId, {
      $push: { friends: req.params.userId },
    });
  } catch (err) {
    console.log(err);
  }
}

//Get a user and populate their thoughts
function getThoughts(req, res) {
  try {
    User.findById(req.params.id)
      .lean() //Used to disable vituals
      .populate("thoughts", "-__v")
      .then((data) => {
        res.json(data);
      });
  } catch (err) {
    res.status(404).json({ message: "Invalid userId!" });
  }
}

module.exports = {
  getUsers,
  addUsers,
  getUser,
  updateUser,
  deleteUser,
  //Friends
  addFriend,
  deleteFriend,
  getFriends,
  getThoughts,
};
