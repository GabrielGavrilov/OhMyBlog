const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const blogRouter = require("./router/BlogRouter");

const app = express();
dotenv.config({ path: path.resolve(__dirname, ".env.development") });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    console.log("Express.JS server successfully connected to MongoDB");
  })
  .catch(function (err) {
    console.log(err);
  });

app.use(
  cors({
    credentials: true,
    origin: [
      `${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}`,
    ],
  })
);
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.listen(process.env.SERVER_PORT, process.env.SERVER_DOMAIN, function () {
  console.log(
    `Express.JS server is running on ${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`
  );
});
