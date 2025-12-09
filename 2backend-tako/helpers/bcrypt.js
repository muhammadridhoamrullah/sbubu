const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const salt = await bcrypt.genSaltSync(10);
  const hashing = await bcrypt.hashSync(password, salt);
  return hashing;
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
