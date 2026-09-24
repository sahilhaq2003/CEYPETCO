const express = require("express");
const router = express.Router();
const c = require("../controllers/tenderDownloadController");
const { protect } = require("../middleware/authMiddleware");

// Public route to record download contact details
router.post("/", c.recordDownload);

// Protected admin routes to retrieve and delete download logs
router.get("/admin", protect, c.getDownloads);
router.delete("/admin/:id", protect, c.deleteDownload);

module.exports = router;
