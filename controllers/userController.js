const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc GEt all contacts
// @route
// @access

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({
    email,
  });
  console.log("user: ", user);
  if (user) {
    return res.status(400).json({ message: "User already Exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hashPassword: ", hashPassword);

  const createdUser = await User.create({
    username,
    email,
    password: hashPassword,
  });
  console.log("createdUser: ", createdUser);
  res.status(201).json({ _id: createdUser.id, email: createdUser.email });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    res.status(200).json(accessToken);
  } else {
    res.status(401);
    throw new Error("Invalid user details");
  }
});

const currentUser = asyncHandler((req, res) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
