const mongoose = require("mongoose");

const popupNoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    priority: {
      type: Number,
      default: 0,
      min: 0,
      max: 1000,
    },
    showOnce: {
      type: Boolean,
      default: true,
    },
    buttonEnabled: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "Learn More",
    },
    buttonLink: {
      type: String,
      trim: true,
      default: "",
    },
    linkType: {
      type: String,
      enum: ["internal", "external"],
      default: "internal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PopupNotice", popupNoticeSchema);