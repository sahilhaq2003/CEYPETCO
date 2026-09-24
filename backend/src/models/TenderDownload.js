const mongoose = require("mongoose");

const tenderDownloadSchema = new mongoose.Schema(
  {
    tenderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tender",
    },
    tenderTitle: {
      type: String,
      required: true,
      trim: true,
    },
    tenderReference: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    documentUrl: {
      type: String,
      trim: true,
    },
    downloadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TenderDownload", tenderDownloadSchema);
