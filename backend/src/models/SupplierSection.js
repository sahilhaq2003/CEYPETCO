const mongoose = require("mongoose");

const supplierSectionSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupplierSection", supplierSectionSchema);
