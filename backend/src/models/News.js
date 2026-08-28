const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    summary: { type: String, trim: true },
    content: { type: String },
    featuredImage: { type: String },
    category: { type: String, default: "general" },
    publishedDate: { type: Date },
    author: { type: String },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
