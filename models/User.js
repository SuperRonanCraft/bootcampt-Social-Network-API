const mongoose = require("mongoose");

//Email regex validation
var validateEmail = function (email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

//User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //Validation if email is formatted correctly
      validate: [validateEmail, "Please fill a valid email address"],
    },
    //Thoughts for a user, references Thoughts Schema
    thoughts: [{ type: mongoose.Types.ObjectId, ref: "thoughts" }],
    //Friends of user, references its self "Users"
    friends: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Friend Count virtual
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//Thought Count virtual
userSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.length;
});

const User = mongoose.model("users", userSchema);

module.exports = User;
