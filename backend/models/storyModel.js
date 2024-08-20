const mongoose = require("mongoose");

const storySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please insert a title"],
    },
    category: {
      type: String,
      enum: ["Fantasy", "Adventure", "Romance", "Mystery", "Thriller"],
      // required: [true, "Please select a category"],
    },
    content: {
      type: String,
      required: [true, "Please write a story"],
    },
    // status: {
    //   type: String,
    //   enum: ["Approved", "Pending"],
    //   default: "Pending",
    // },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Story", storySchema);
