const mongoose = require("mongoose");

const annualReportSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, trim: true },
    url: { type: String, trim: true },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnnualReport", annualReportSchema);
