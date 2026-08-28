const express = require("express");
const router = express.Router();
const { uploadImage, uploadDocument } = require("../controllers/uploadController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router
  .route("/image")
  .post(protect, authorize("super_admin", "admin", "editor"), uploadImage);

router
  .route("/document")
  .post(protect, authorize("super_admin", "admin", "editor"), uploadDocument);

module.exports = router;
