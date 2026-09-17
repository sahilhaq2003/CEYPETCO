const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
  year: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
});

const galleryItemSchema = new mongoose.Schema({
  image: { type: String, required: true, trim: true },
  alt: { type: String, trim: true },
  caption: { type: String, trim: true },
  wide: { type: Boolean, default: false },
});

const historyPageSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: "history" },
    heroLabel: { type: String, required: true, trim: true },
    heroTitle: { type: String, required: true, trim: true },
    heroIntro: { type: String, required: true, trim: true },
    heroImage: { type: String, required: true, trim: true },
    journeyLabel: { type: String, required: true, trim: true },
    journeyTitle: { type: String, required: true, trim: true },
    journeyIntro: { type: String, required: true, trim: true },
    galleryLabel: { type: String, required: true, trim: true },
    galleryTitle: { type: String, required: true, trim: true },
    milestones: { type: [milestoneSchema], default: [] },
    gallery: { type: [galleryItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HistoryPage", historyPageSchema);
