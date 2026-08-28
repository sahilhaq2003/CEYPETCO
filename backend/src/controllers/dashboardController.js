const News = require("../models/News");
const Notice = require("../models/Notice");
const Tender = require("../models/Tender");
const Career = require("../models/Career");
const ContactMessage = require("../models/ContactMessage");
const FuelPrice = require("../models/FuelPrice");
const FuelStation = require("../models/FuelStation");
const RegionalOffice = require("../models/RegionalOffice");

const getDashboardStats = async (req, res, next) => {
  try {
    const [
      news,
      notices,
      tenders,
      careers,
      messages,
      fuelPrices,
      unreadMessages,
      openTenders,
      publications,
      fuelStations,
      regionalOffices,
    ] = await Promise.all([
      News.countDocuments({ status: { $ne: "archived" } }),
      Notice.countDocuments({ status: { $ne: "archived" } }),
      Tender.countDocuments(),
      Career.countDocuments({ status: { $ne: "draft" } }),
      ContactMessage.countDocuments({ status: { $ne: "archived" } }),
      FuelPrice.countDocuments({ status: "active" }),
      ContactMessage.countDocuments({ status: "new" }),
      Tender.countDocuments({ status: "open" }),
      News.countDocuments({ status: "published" }),
      FuelStation.countDocuments({ status: "active" }),
      RegionalOffice.countDocuments({ status: "active" }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        news,
        notices,
        tenders,
        careers,
        messages,
        fuelPrices,
        unreadMessages,
        openTenders,
        publications,
        fuelStations,
        regionalOffices,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };
