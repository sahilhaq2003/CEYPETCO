const Career = require("../models/Career");
const createCrudController = require("./crudController");

const crud = createCrudController(Career, {
  searchFields: ["title", "reference", "department", "location"],
  sortBy: "-publishedDate",
});

const getActive = async (req, res, next) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const items = await Career.find({
      status: "open",
      $or: [
        { applicationDeadline: { $exists: false } },
        { applicationDeadline: null },
        { applicationDeadline: { $gte: today } },
      ],
    }).sort("-publishedDate");
    res.status(200).json({
      success: true,
      data: items,
      pagination: { total: items.length },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { ...crud, getActive };
