const mongoose = require("mongoose");

const reactSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  thought_id: {
    type: mongoose.Types.ObjectId,
    required: true,
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
    username: {
      type: String,
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
