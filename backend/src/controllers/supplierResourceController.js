const SupplierResource = require("../models/SupplierResource");
const createCrudController = require("./crudController");

const crud = createCrudController(SupplierResource, {
  searchFields: ["title"],
  sortBy: "order",
  assetFields: [{ field: "url" }],
});

const getPublished = async (req, res, next) => {
  try {
    const items = await SupplierResource.find({
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
