const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// 1. Setup Cloudinary configuration from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Setup cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "sbubu_media";
    switch (file.fieldname) {
      case "voiceFile":
        folder = "sbubu_voices";
        break;
      case "avatarUrl":
        folder = "sbubu_profile_pictures";
        break;
      case "banner":
        folder = "sbubu_banner_pictures";
        break;
    }

    const format = file.mimetype.split("/")[1];

    return {
      folder: folder,
      resource_type: "auto",
      format,
      public_id: `${file.fieldname}-${Date.now()}_${
        path.parse(file.originalname).name
      }`,
    };
  },
});

// 3. Buat instance multer dengan storage Cloudinary
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

module.exports = upload;
