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
    }).sort("order");
    res.status(200).json({
      success: true,
      data: items,
      pagination: { total: items.length },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { ...crud, getPublished };
