const HomeService = require("../models/HomeService");
const createCrudController = require("./crudController");

const crud = createCrudController(HomeService, {
  searchFields: ["title", "description"],
  sortBy: "order",
});

const getPublished = async (req, res, next) => {
  try {
    const items = await HomeService.find({ status: "published" }).sort("order");
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

module.exports = { ...crud, getPublished };