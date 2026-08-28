const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const USE_CLOUDINARY = Boolean(
  process.env.CLOUDINARY_URL ||
    (process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET)
);

if (USE_CLOUDINARY && !process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const localUploadDir = path.resolve(__dirname, "../../uploads");
if (!USE_CLOUDINARY && !fs.existsSync(localUploadDir)) {
  fs.mkdirSync(localUploadDir, { recursive: true });
}

const allowedImageTypes = /jpeg|jpg|png|webp|gif|avif|svg/;
const imageFilter = (_req, file, cb) => {
  const extOk = allowedImageTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeOk = allowedImageTypes.test(file.mimetype);
  if (extOk && mimeOk) return cb(null, true);
  cb(new Error("Only image files are allowed (jpeg, png, webp, gif, svg)"));
};

const allowedDocTypes = /pdf|doc|docx|xls|xlsx|csv|zip|rar|pptx|ppt/;
const docFilter = (_req, file, cb) => {
  const extOk = allowedDocTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeOk = /pdf|msword|officedocument|sheet|zip|rar|presentation|text/.test(
    file.mimetype
  );
  if (extOk || mimeOk) return cb(null, true);
  cb(new Error("Unsupported document type"));
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFilter,
  limits: { fileSize: 8 * 1024 * 1024 },
});

const docUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: docFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

const uploadToCloudinary = (buffer, resourceType) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "ceypetco", resource_type: resourceType || "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });

const saveLocally = (buffer, originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  fs.writeFileSync(path.join(localUploadDir, name), buffer);
  return `/uploads/${name}`;
};

const runUpload = (req, res, file, isDoc) => {
  const resourceType = isDoc ? "raw" : "image";
  const doUpload = async () => {
    let url;
    if (USE_CLOUDINARY) {
      url = await uploadToCloudinary(req.file.buffer, resourceType);
    } else {
      url = saveLocally(req.file.buffer, req.file.originalname);
    }
    res.status(201).json({
      success: true,
      message: isDoc
        ? "Document uploaded successfully"
        : "Image uploaded successfully",
      data: {
        filename: url.split("/").pop(),
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url,
      },
    });
  };

  doUpload().catch((err) => {
    res
      .status(500)
      .json({ success: false, message: "Upload failed: " + err.message });
  });
};

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image file uploaded" });
    }
    runUpload(req, res, req.file, false);
  });
};

const uploadDocument = (req, res, next) => {
  docUpload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No document file uploaded" });
    }
    runUpload(req, res, req.file, true);
  });
};

module.exports = { uploadImage, uploadDocument };
