const mongoose = require("mongoose");

const reactSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema to create Student model
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 256,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    //Added because README says so, but I would not like to save a changeable datapoint
    username: {
      type: String,
      required: true,
    },
    //Added userId because usernames can change
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    reactions: [reactSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thought = mongoose.model("thoughts", thoughtSchema);

module.exports = Thought;
