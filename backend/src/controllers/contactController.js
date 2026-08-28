const ContactMessage = require("../models/ContactMessage");
const createCrudController = require("./crudController");

module.exports = createCrudController(ContactMessage, {
  searchFields: ["name", "email", "subject"],
  sortBy: "-createdAt",
});
