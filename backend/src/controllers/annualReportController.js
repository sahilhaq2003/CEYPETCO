const AnnualReport = require("../models/AnnualReport");
const createCrudController = require("./crudController");

const crud = createCrudController(AnnualReport, {
  searchFields: ["year"],
  sortBy: "-year",
  assetFields: [{ field: "url" }],
});

const getPublished = async (req, res, next) => {
  try {
    const items = await AnnualReport.find({ status: "published" }).sort(
      "-year"
    );
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
