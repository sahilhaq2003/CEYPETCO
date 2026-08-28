const cloudinary = require("cloudinary").v2;

const isConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_URL ||
      (process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET)
  );

if (isConfigured() && !process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const isCloudinaryUrl = (url) =>
  typeof url === "string" && url.includes("res.cloudinary.com");

const parse = (url) => {
  if (!isCloudinaryUrl(url)) return null;
  let s = url;
  let resourceType = "image";
  const typeMatch = s.match(/\/(image|raw|video)\/upload\//);
  if (typeMatch) resourceType = typeMatch[1];
  const token = "/upload/";
  const idx = s.indexOf(token);
  if (idx === -1) return null;
  let rest = s.slice(idx + token.length);
  const qIdx = rest.indexOf("?");
  if (qIdx !== -1) rest = rest.slice(0, qIdx);
  rest = rest.replace(/^v\d+\//, "");
  rest = rest.replace(/\.[a-zA-Z0-9]+$/, "");
  if (!rest) return null;
  return { publicId: rest, resourceType };
};

const deleteAsset = async (url) => {
  if (!isConfigured()) return { deleted: false, reason: "not-configured" };
  const parsed = parse(url);
  if (!parsed) return { deleted: false, reason: "not-cloudinary" };
  try {
    await cloudinary.uploader.destroy(parsed.publicId, {
      resource_type: parsed.resourceType,
      invalidate: true,
    });
    return { deleted: true, publicId: parsed.publicId, resourceType: parsed.resourceType };
  } catch (err) {
    return { deleted: false, reason: err.message };
  }
};

const deleteAssets = async (urls) => {
  const results = [];
  for (const url of urls || []) {
    if (typeof url === "string") results.push(await deleteAsset(url));
  }
  return results;
};

module.exports = { isConfigured, isCloudinaryUrl, parse, deleteAsset, deleteAssets };
