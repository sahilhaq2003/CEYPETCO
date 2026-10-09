const GalleryItem = require("../models/GalleryItem");
const createCrudController = require("./crudController");

const crud = createCrudController(GalleryItem, {
  searchFields: ["title", "description", "category", "type"],
  sortBy: "sortOrder -createdAt",
  assetFields: [{ field: "src" }, { field: "poster" }],
});

const getPublished = async (req, res, next) => {
  try {
    const items = await GalleryItem.find({ status: "published" }).sort("sortOrder -createdAt");
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

module.exports = { ...crud, getPublished };
