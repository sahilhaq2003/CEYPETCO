const mongoose = require("mongoose");

const regionalOfficeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    region: { type: String, trim: true },
    district: { type: String, trim: true },
    address: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    manager: { type: String, trim: true },
    openingHours: { type: String, trim: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RegionalOffice", regionalOfficeSchema);
