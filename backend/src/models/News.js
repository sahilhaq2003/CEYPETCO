const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    summary: { type: String, trim: true },
    content: { type: String },
    featuredImage: { type: String },
    images: { type: [String], default: [] },
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

newsSchema.pre("validate", function () {
  if (!this.slug) this.slug = `news-${this._id}`;
});

module.exports = mongoose.model("News", newsSchema);
