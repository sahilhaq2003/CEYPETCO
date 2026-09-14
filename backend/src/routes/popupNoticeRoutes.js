const express = require("express");
const router = express.Router();
const c = require("../controllers/popupNoticeController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.route("/active").get(c.getActive);

router.use(protect);

router
  .route("/")
  .get(authorize("super_admin", "admin"), c.getAll)
  .post(authorize("super_admin", "admin"), c.create);

router
  .route("/:id")
  .get(authorize("super_admin", "admin"), c.getById)
  .put(authorize("super_admin", "admin"), c.update)
  .delete(authorize("super_admin", "admin"), c.remove);

router.route("/:id/status").patch(authorize("super_admin", "admin"), c.updateStatus);

router
  .route("/:id/reset-visibility")
  .post(authorize("super_admin", "admin"), c.resetVisibility);

module.exports = router;