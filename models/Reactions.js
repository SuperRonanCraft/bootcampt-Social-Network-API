const { Schema, model } = require("mongoose");

// Schema to create Student model
const schema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thought_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Reactions = model("reactions", schema);

module.exports = Reactions;
