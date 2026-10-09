const GalleryItem = require("./models/GalleryItem");
const GalleryState = require("./models/GalleryState");

const defaults = [
  ["Aviation operations", "Aviation", "/images/aviation-gallery-2.jpg"],
  ["Aircraft refuelling", "Aviation", "/images/aviation-aircraft-refuelling.jpg"],
  ["Ready for departure", "Aviation", "/images/aviation-gallery-1.jpg"],
  ["Airside service", "Aviation", "/images/aviation-gallery-5.jpg"],
  ["Refinery at work", "Operations", "/images/refinery-detail-1.jpg"],
  ["Process infrastructure", "Operations", "/images/refinery-detail-2.jpg"],
  ["Islandwide distribution", "Distribution", "/images/media-3.jpg"],
  ["Fuel by rail", "Distribution", "/images/fuel-train.jpg"],
  ["Agrochemical production", "Agrochemicals", "/images/agro-production-1.webp"],
  ["Production quality", "Agrochemicals", "/images/agro-production-2.webp"],
  ["Crop-care solutions", "Agrochemicals", "/images/agro-products.jpg"],
  ["Marine bunkering", "Marine", "/images/bunkering/marine-terminal.webp"],
  ["Marine fuel transfer", "Marine", "/images/bunkering/marine-fuel-transfer.webp"],
  ["Serving international shipping", "Marine", "/images/bunkering/jupiter-sun.jpg"],
  ["Electric mobility", "Future energy", "/images/electric-mobility/ev-charging-station-1448.webp"],
  ["Charging the future", "Future energy", "/images/electric-mobility/ev-charging-hero-1600.webp"],
  ["Precision on the apron", "Aviation", "/images/aviation-gallery-4.jpg"],
  ["Our legacy", "Heritage", "/images/history-3.jpg"],
  ["Foundations of service", "Heritage", "/images/history-1.jpg"],
  ["A national journey", "Heritage", "/images/history-7.jpg"],
];

const ensureGallery = async () => {
  // This educational process diagram is used on the refinery page, not in the media gallery.
  await GalleryItem.deleteMany({ src: "/images/refinery-process.jpg" });
  const initialized = await GalleryState.findOne({ key: "gallery-initialized" });
  if (initialized) return;

  const existingCount = await GalleryItem.countDocuments();
  if (existingCount === 0) {
    await GalleryItem.insertMany(defaults.map(([title, category, src], index) => ({
      title,
      category,
      src,
      alt: title,
      sortOrder: index + 1,
      status: "published",
      type: "image",
    })));
  }
  await GalleryState.create({ key: "gallery-initialized" });
};

module.exports = ensureGallery;
