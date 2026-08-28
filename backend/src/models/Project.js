const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, trim: true },
    summary: { type: String, trim: true },
    content: { type: String },
    featuredImage: { type: String },
    category: { type: String, default: "general" },
    location: { type: String, trim: true },
    statusLabel: { type: String, trim: true },
    documents: [{ name: String, url: String }],
    startDate: { type: Date },
    completionDate: { type: Date },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
