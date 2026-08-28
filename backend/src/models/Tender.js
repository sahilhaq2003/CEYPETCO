const mongoose = require("mongoose");

const tenderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    reference: { type: String, trim: true },
    summary: { type: String, trim: true },
    description: { type: String },
    category: { type: String, default: "general" },
    division: { type: String, trim: true },
    documents: [{ name: String, url: String }],
    publishedDate: { type: Date },
    closingDate: { type: Date },
    status: {
      type: String,
      enum: ["open", "closed", "awarded", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tender", tenderSchema);
