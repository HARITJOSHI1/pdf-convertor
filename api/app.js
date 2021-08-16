const express = require("express");
const app = express();
const error = require("./utils/errors");
const AppError = require("./utils/AppError");

const PDFRoute = require("./routes/PDFRoute");
app.use(express.json());
app.use("/api/v1/PDF", PDFRoute);
app.all("*", (req, res, next) => {
  const err = new AppError(404, `Cannot find ${req.originalUrl} on this server`);
  next(err);
});

app.use(error);

module.exports = app;
