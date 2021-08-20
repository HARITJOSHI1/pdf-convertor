const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const libre = require("libreoffice-convert");
const AppError = require("../utils/AppError");

dotenv.config({ path: "../config.env" });
const catchAsync = require("../utils/catchAsync");


exports.convert = catchAsync(async (req, res, next) => {
  const { filename } = req.query;
  const outputFile = String(filename).split(".docx")[0];

  const inputPath = path.join(__dirname, `../files/${filename}`);
  const outputPath = path.join(__dirname, `../output/${outputFile}.pdf`);

  const file = fs.readFileSync(inputPath);

  libre.convert(file, ".pdf", undefined, (err, done) => {
    if (err) return next(new AppError(500, "Something went worng !"));

    fs.writeFile(outputPath, done, "utf-8", (err) => {
      if (err) return next(new AppError(500, "Something went worng !"));

      const doc = fs.readFileSync(outputPath);

      res.download(outputPath, (err) => {
        if (err) return next(new AppError(500, "Something went worng !"));
        fs.unlinkSync(outputPath); 
      });
    });

  });
});
