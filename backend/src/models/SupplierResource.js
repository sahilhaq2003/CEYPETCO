const mongoose = require("mongoose");

const supplierResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, trim: true },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SupplierResource", supplierResourceSchema);
