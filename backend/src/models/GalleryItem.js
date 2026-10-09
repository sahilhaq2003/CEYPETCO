const mongoose = require("mongoose");

const galleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    category: { type: String, required: true, trim: true, default: "General" },
    type: { type: String, enum: ["image", "video"], default: "image" },
    src: { type: String, required: true, trim: true },
    poster: { type: String, trim: true, default: "" },
    alt: { type: String, trim: true, default: "" },
    sortOrder: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
  },
  { timestamps: true }
);

galleryItemSchema.index({ status: 1, sortOrder: 1, createdAt: -1 });

module.exports = mongoose.model("GalleryItem", galleryItemSchema);
