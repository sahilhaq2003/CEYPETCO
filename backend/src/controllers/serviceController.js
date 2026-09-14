const Service = require("../models/Service");
const createCrudController = require("./crudController");

const crud = createCrudController(Service, {
  searchFields: ["title", "category", "text"],
  sortBy: "order",
  assetFields: [{ field: "image" }],
});

const getPublished = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const search = req.query.search?.trim();

    const query = { status: "published" };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { text: { $regex: search, $options: "i" } },
      ];
    }

    const [items, total] = await Promise.all([
      Service.find(query).sort("order").skip(skip).limit(limit),
      Service.countDocuments(query),
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