const { Schema, model } = require("mongoose");
const thoughtSchama = require("./Thoughts");

// Schema to create Student model
const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    reactions: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thoughts" }],
    friends: [{ type: Schema.Types.ObjectId, ref: this }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Student = model("student", studentSchema);

module.exports = Student;
