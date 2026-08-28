const ManagementTeamMember = require("../models/ManagementTeamMember");
const createCrudController = require("./crudController");

const crud = createCrudController(ManagementTeamMember, {
  searchFields: ["name", "role"],
  sortBy: "order",
  assetFields: [{ field: "photo" }],
});

const getPublished = async (req, res, next) => {
  try {
    const items = await ManagementTeamMember.find({
      status: "published",
    })
      .sort("order")
      .lean();
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.status(200).json({
      success: true,
      data: items,
      pagination: { total: items.length },
    });
  } catch (error) {
    next(error);
  }
};

const getPublishedById = async (req, res, next) => {
  try {
    const item = await ManagementTeamMember.findOne({
      _id: req.params.id,
      status: "published",
    }).lean();
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Management team member not found",
      });
    }
    res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

module.exports = { ...crud, getPublished, getPublishedById };
