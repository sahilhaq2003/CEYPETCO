const SupplierSection = require("../models/SupplierSection");
const createCrudController = require("./crudController");

const crud = createCrudController(SupplierSection, {
  sortBy: "-createdAt",
});

const getFirst = async (req, res, next) => {
  try {
    let section = await SupplierSection.findOne().sort("-createdAt");
    if (!section) {
      section = await SupplierSection.create({
        eyebrow: "SUPPLIER ACCESS",
        title: "Registration resources",
        description:
          "Guidance and application support for oil suppliers, foreign suppliers, independent inspectors and local contractors.",
      });
    }
    res.status(200).json({ success: true, data: section });
  } catch (error) {
    next(error);
  }
};

const upsertFirst = async (req, res, next) => {
  try {
    const existing = await SupplierSection.findOne().sort("-createdAt");
    let section;
    if (existing) {
      existing.set(req.body);
      section = await existing.save();
    } else {
      section = await SupplierSection.create(req.body);
    }
    res.status(200).json({ success: true, data: section });
  } catch (error) {
    next(error);
  }
};

module.exports = { ...crud, getFirst, upsertFirst };
