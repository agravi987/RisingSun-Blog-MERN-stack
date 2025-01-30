const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/blogit-database";

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error occurred: ", err));

const accountRouter = require("./Routers/AccountRoute");
const subscriptionRouter = require("./Routers/SubscriptionRoute");
const blogsRouter = require("./Routers/BlogsRoute");

app.use("/account", accountRouter);
app.use("/subscribe", subscriptionRouter);
app.use("/blogs", blogsRouter);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
