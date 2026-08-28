const Project = require("../models/Project");
const createCrudController = require("./crudController");

const crud = createCrudController(Project, {
  searchFields: ["title", "category", "location"],
  sortBy: "-createdAt",
  assetFields: [
    { field: "featuredImage" },
    { field: "documents", urlKey: "url" },
  ],
});

const getPublished = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const query = { status: "published" };
    const [items, total] = await Promise.all([
      Project.find(query).sort("-createdAt").skip(skip).limit(limit),
      Project.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { ...crud, getPublished };
