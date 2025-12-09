async function errorHandler(err, req, res, next) {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    let errors = err.errors.map((el) => el.message);
    res.status(400).json({ message: errors });
  } else if (err.name === "TokenExpiredError") {
    res.status(401).json({ message: "Token has expired" });
  } else if (Error.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" });
  } else if (err.name === "NotBeforeError") {
    res.status(401).json({ message: "Token not active" });
  } else if (err.name === "NO_TOKEN_PROVIDED") {
    res.status(401).json({ message: "No token provided" });
  } else if (err.name === "INVALID_TOKEN_FORMAT") {
    res.status(401).json({ message: "Invalid token format" });
  } else if (err.name === "USER_REGISTER_VALIDATION") {
    res.status(400).json({
      message: "Fields name, username, email, and password are required",
    });
  } else if (err.name === "USER_REGIS_USERNAME_ALREADY_EXISTS") {
    res.status(400).json({ message: "Username is already exists" });
  } else if (err.name === "USER_REGIS_EMAIL_ALREADY_EXISTS") {
    res.status(400).json({ message: "Email already registered" });
  }
}

module.exports = errorHandler;

// USER_REGISTER_VALIDATION
// USER_REGIS_USERNAME_ALREADY_EXISTS
// USER_REGIS_EMAIL_ALREADY_EXISTS
