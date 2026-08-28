const News = require("../models/News");
const createCrudController = require("./crudController");

const crud = createCrudController(News, {
  searchFields: ["title", "summary", "category", "author"],
  sortBy: "-publishedDate",
  assetFields: [{ field: "featuredImage" }],
});

const getPublished = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const query = { status: "published" };
    const [items, total] = await Promise.all([
      News.find(query).sort("-publishedDate").skip(skip).limit(limit),
      News.countDocuments(query),
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
