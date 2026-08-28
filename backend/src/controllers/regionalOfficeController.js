const RegionalOffice = require("../models/RegionalOffice");
const createCrudController = require("./crudController");

module.exports = createCrudController(RegionalOffice, {
  searchFields: ["name", "region", "district"],
  sortBy: "name",
});
