const FuelPrice = require("../models/FuelPrice");
const createCrudController = require("./crudController");

module.exports = createCrudController(FuelPrice, {
  searchFields: ["product", "type"],
  sortBy: "-effectiveDate",
});
