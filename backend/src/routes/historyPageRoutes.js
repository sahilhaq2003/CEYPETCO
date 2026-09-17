const router = require("express").Router();
const controller = require("../controllers/historyPageController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

router.get("/", controller.get);
router.put("/", protect, authorize("super_admin", "admin", "editor"), controller.update);

module.exports = router;
