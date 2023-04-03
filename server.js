const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const connectDb = require("./config/dbConnection");

const errorHandler = require("./middleware/errorHandler");

const port = process.env.PORT || 5000;

connectDb();

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));

app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
