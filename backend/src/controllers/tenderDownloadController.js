const TenderDownload = require("../models/TenderDownload");

// Record a new tender download contact submission (Public)
const recordDownload = async (req, res, next) => {
  try {
    const { tenderId, tenderTitle, tenderReference, email, mobileNumber, documentUrl } = req.body;

    if (!email || !mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Email address and mobile number are required.",
      });
    }

    const downloadRecord = await TenderDownload.create({
      tenderId: tenderId || null,
      tenderTitle: tenderTitle || "Tender Document",
      tenderReference: tenderReference || "",
      email,
      mobileNumber,
      documentUrl: documentUrl || "",
    });

    res.status(201).json({
      success: true,
      message: "Download details recorded successfully.",
      data: downloadRecord,
    });
  } catch (error) {
    next(error);
  }
};

// Get all tender download logs (Admin Protected)
const getDownloads = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { mobileNumber: { $regex: search, $options: "i" } },
        { tenderTitle: { $regex: search, $options: "i" } },
        { tenderReference: { $regex: search, $options: "i" } },
      ];
    }

    const [items, total] = await Promise.all([
      TenderDownload.find(query)
        .sort("-createdAt")
        .skip(skip)
        .limit(limit)
        .lean(),
      TenderDownload.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a download log (Admin Protected)
const deleteDownload = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await TenderDownload.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }
    res.status(200).json({ success: true, message: "Record deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  recordDownload,
  getDownloads,
  deleteDownload,
};
