const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    summary: { type: String, trim: true },
    content: { type: String },
    category: { type: String, default: "general" },
    document: { type: String },
    publishedDate: { type: Date },
    expiresAt: { type: Date },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
