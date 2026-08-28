const mongoose = require("mongoose");

const fuelStationSchema = new mongoose.Schema(
  {
    dealerNo: { type: String, required: true, unique: true, trim: true },
    dealerName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true, index: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FuelStation", fuelStationSchema);
