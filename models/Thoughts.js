const { Schema, model } = require("mongoose");
const Reactions = require("./Reactions");

// Schema to create Student model
const thoughtSchama = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [Reactions],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thoughts = model("thoughts", thoughtSchama);

module.exports = Thoughts;
