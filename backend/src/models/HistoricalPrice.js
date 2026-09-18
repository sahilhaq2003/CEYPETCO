const mongoose = require("mongoose");

const historicalPriceSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ["fuel", "bitumen"], required: true },
    dateLabel: { type: String, required: true, trim: true },
    year: { type: String, required: true },
    sortKey: { type: Number, required: true },
    values: { type: [String], required: true },
    note: { type: String, default: "", trim: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    sourceIndex: { type: Number, default: 0 },
    seedId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

historicalPriceSchema.index({ kind: 1, status: 1, sortKey: -1, sourceIndex: 1 });

module.exports = mongoose.model("HistoricalPrice", historicalPriceSchema);
