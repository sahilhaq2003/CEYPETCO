const ManagementContact = require("../models/ManagementContact");
const createCrudController = require("./crudController");

const crud = createCrudController(ManagementContact, {
  searchFields: ["name", "role", "group", "email"],
  sortBy: "group",
});

const getPublished = async (req, res, next) => {
  try {
    const items = await ManagementContact.find({ status: "published" }).sort({
      group: 1,
      order: 1,
    }).lean();
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

module.exports = { ...crud, getPublished };
