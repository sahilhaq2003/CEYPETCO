const mongoose = require("mongoose");

const mobileAppSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    platform: {
      type: String,
      enum: ["android", "ios", "web"],
      default: "android",
    },
    appIcon: { type: String },
    downloadUrl: { type: String, trim: true },
    storeUrl: { type: String, trim: true },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MobileApp", mobileAppSchema);