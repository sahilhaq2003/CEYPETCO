const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    order: { type: Number, default: 0 },
    kicker: { type: String, trim: true },
    heading: { type: String, trim: true },
    copy: [String],
    image: { type: String },
    stats: [{ value: String, label: String }],
    features: [String],
    detailTitle: { type: String, trim: true },
    detailRows: [{ name: String, value: String, unit: String }],
    paragraphs: [String],
    keyFacts: [String],
    gallery: [String],
    locations: [
      {
        name: String,
        code: String,
        service: String,
        capacity: String,
        avgas: String,
        contacts: [{ role: String, phone: String, email: String }],
      },
    ],
    certs: [{ standard: String, label: String }],
    productGroups: [{ group: String, products: [String] }],
    standards: [String],
    mission: { heading: String, text: String },
    vision: { heading: String, text: String },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Division", divisionSchema);