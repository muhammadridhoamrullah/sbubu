async function errorHandler(err, req, res, next) {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = err.errors.map((el) => el.message);
    res.status(400).json({ message: errors });
  } else if (err.name === "USER_REGISTER_VALIDATION") {
    res.status(400).json({
      message: "Fields name, username, email, and password are required",
    });
  } else if (err.name === "USER_REGISTER_USERNAME_UNIQUE") {
    res.status(400).json({ message: "Username is already taken" });
  } else if (err.name === "USER_REGISTER_EMAIL_UNIQUE") {
    res.status(400).json({ message: "Email is already registered" });
  } else if (err.name === "INVALID_TOKEN") {
    res.status(401).json({ message: "Invalid token" });
  } else if (err.name === "USER_VERIFY_EMAIL_ALREADY_VERIFIED") {
    res.status(400).json({ message: "Email is already verified" });
  } else if (err.name === "USER_FAILED_TO_VERIFY") {
    res.status(400).json({ message: "Failed to verify email" });
  } else if (err.name === "USER_LOGIN_VALIDATION") {
    res
      .status(400)
      .json({ message: "Fields Email/Username and Password are required" });
  } else if (err.name === "USER_LOGIN_EMAIL_PASSWORD_INVALID") {
    res.status(401).json({ message: "Invalid Email/Username or Password" });
  } else if (err.name === "USER_LOGIN_EMAIL_NOT_VERIFIED") {
    res.status(401).json({ message: "Email is not verified" });
  } else if (err.name === "DONATION_CREATE_INPUT_ERROR") {
    res.status(400).json({ message: "Donor Name and Amount are required" });
  } else if (err.name === "DONATION_CREATE_INPUT_AMOUNT_ERROR") {
    res.status(400).json({ message: "Minimum donation amount is 5000" });
  } else if (err.name === "STREAMER_NOT_FOUND") {
    res.status(404).json({ message: "Streamer not found" });
  } else if (err.name === "DONATION_NOT_FOUND") {
    res.status(404).json({ message: "Donation not found" });
  } else if (err.name === "UNAUTHORIZED") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.name === "USER_NOT_FOUND") {
    res.status(404).json({ message: "User not found" });
  } else if (err.name === "jwt malformed" || err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = errorHandler;
