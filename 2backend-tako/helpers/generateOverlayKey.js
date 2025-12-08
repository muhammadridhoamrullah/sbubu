const crypto = require("crypto");

function generateOverlayKey() {
  return crypto.randomBytes(16).toString("hex");
}

module.exports = generateOverlayKey;
