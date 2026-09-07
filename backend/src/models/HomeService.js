const mongoose = require("mongoose");

const homeServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    icon: { type: String, default: "globe" },
    link: { type: String, trim: true },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeService", homeServiceSchema);