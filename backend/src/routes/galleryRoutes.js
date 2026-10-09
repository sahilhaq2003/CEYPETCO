const express = require("express");
const router = express.Router();
const c = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", c.getPublished);
router.get("/manage", protect, c.getAll);
router.get("/:id", protect, c.getById);
router.post("/", protect, authorize("super_admin", "admin", "editor"), c.create);
router.put("/:id", protect, authorize("super_admin", "admin", "editor"), c.update);
router.delete("/:id", protect, authorize("super_admin", "admin"), c.remove);

module.exports = router;
