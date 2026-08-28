const mongoose = require("mongoose");

const fuelPriceSchema = new mongoose.Schema(
  {
    product: { type: String, required: true, trim: true },
    type: { type: String, default: "fuel" },
    category: {
      type: String,
      enum: ["White Oil", "Black Oil", "Lubricants", "Aviation Fuel"],
      default: "White Oil",
    },
    price: { type: Number, required: true, min: 0 },
    unit: { type: String, default: "LKR" },
    effectiveDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FuelPrice", fuelPriceSchema);
