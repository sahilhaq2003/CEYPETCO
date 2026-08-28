const express = require("express");
const router = express.Router();
const c = require("../controllers/supplierSectionController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.route("/").get(c.getFirst);

router.use(protect);

router
  .route("/")
  .post(authorize("super_admin", "admin", "editor"), c.upsertFirst)
  .put(authorize("super_admin", "admin", "editor"), c.upsertFirst);

module.exports = router;
