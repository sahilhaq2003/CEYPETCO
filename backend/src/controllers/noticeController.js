const Notice = require("../models/Notice");
const createCrudController = require("./crudController");

const crud = createCrudController(Notice, {
  searchFields: ["title", "summary", "category"],
  sortBy: "-publishedDate",
  assetFields: [{ field: "document" }],
});

const getPublished = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const now = new Date();
    const query = {
      status: "published",
      $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gte: now } }],
    };
    const [items, total] = await Promise.all([
      Notice.find(query).sort("-publishedDate").skip(skip).limit(limit),
      Notice.countDocuments(query),
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
