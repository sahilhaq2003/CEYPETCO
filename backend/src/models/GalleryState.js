const mongoose = require("mongoose");

const galleryStateSchema = new mongoose.Schema({
  key: { type: String, unique: true, default: "gallery-initialized" },
  initializedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GalleryState", galleryStateSchema);
