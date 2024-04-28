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
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [reactSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thoughts = mongoose.model("thoughts", thoughtSchema);

module.exports = Thoughts;
