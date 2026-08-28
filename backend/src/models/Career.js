const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    reference: { type: String, trim: true },
    department: { type: String, trim: true },
    location: { type: String, trim: true },
    type: { type: String, default: "Full-time" },
    description: { type: String },
    responsibilities: { type: String },
    requirements: { type: String },
    salary: { type: String, trim: true },
    applicationDeadline: { type: Date },
    publishedDate: { type: Date },
    status: {
      type: String,
      enum: ["open", "closed", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);
