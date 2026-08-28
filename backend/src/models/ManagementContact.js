const mongoose = require("mongoose");

const managementContactSchema = new mongoose.Schema(
  {
    group: {
      type: String,
      trim: true,
      default: "Corporate Management",
    },
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ManagementContact", managementContactSchema);
