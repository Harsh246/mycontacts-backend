const asyncHandler = require("express-async-handler");

const jwt = require("jsonwebtoken");

const validateRequest = asyncHandler(async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      console.log("decoded: ", decoded);
      if (err) {
        res.status("401");
        throw new Error("unauthorized access");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status("401");
    throw new Error("unauthorized access");
  }
});

module.exports = validateRequest;
