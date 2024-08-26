const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema(
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
    country: {
      type: String,
      required: [true, "Please select a country"],
    },
    content: {
      type: String,
      required: [true, "Please write a story"],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Experience", experienceSchema);
