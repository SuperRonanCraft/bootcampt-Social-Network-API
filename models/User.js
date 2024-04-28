const mongoose = require("mongoose");

var validateEmail = function (email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

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
      validate: [validateEmail, "Please fill a valid email address"],
    },
    thoughts: [{ type: mongoose.Types.ObjectId, ref: "thoughts" }],
    friends: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//Friend Count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//Thought Count
userSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.length;
});

const User = mongoose.model("users", userSchema);

module.exports = User;
