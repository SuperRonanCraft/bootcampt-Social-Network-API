const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max_length: 50,
  },
  email: {
    type: String,
    required: true,
  },
  thoughts: [{ type: mongoose.Types.ObjectId, ref: "thoughts" }],
  friends: [{ type: mongoose.Types.ObjectId, ref: "users" }],
});

const Student = mongoose.model("users", schema);

module.exports = Student;
