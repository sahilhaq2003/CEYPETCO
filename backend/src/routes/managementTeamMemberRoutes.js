const express = require("express");
const router = express.Router();
const c = require("../controllers/managementTeamMemberController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.route("/active").get(c.getPublished);
router.route("/active/:id").get(c.getPublishedById);

router.use(protect);

router
  .route("/")
  .get(c.getAll)
  .post(authorize("super_admin", "admin", "editor"), c.create);

router
  .route("/:id")
  .get(c.getById)
  .put(authorize("super_admin", "admin", "editor"), c.update)
  .delete(authorize("super_admin", "admin"), c.remove);

module.exports = router;
