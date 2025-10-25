const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authentication(req, res, next) {
  try {
    console.log("Authentication");

    // ambil token dari header
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "UNAUTHORIZED" };
    }

    const token = authorization.split(" ")[1];

    // verifikasi token
    const payload = verifyToken(token);

    

    // cek apakah user ada di database
    let user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "UNAUTHORIZED" };
    }

    // simpan data user ke req
    req.user = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
};

// UNAUTHORIZED
