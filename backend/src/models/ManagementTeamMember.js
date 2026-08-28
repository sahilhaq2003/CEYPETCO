const mongoose = require("mongoose");

const managementTeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    photo: { type: String, trim: true },
    description: { type: String, trim: true },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ManagementTeamMember", managementTeamMemberSchema);
