const axios = require("axios").default;
const path = require("path");
const fs = require("fs");

const docxConverter = require("docx-pdf");

const { PDFNet } = require("@pdftron/pdfnet-node");
const catchAsync = require("../utils/catchAsync");

exports.getData = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Hello World",
  });
});

exports.convert = catchAsync(async (req, res) => {
  const { filename } = req.query;
  const outputFile = String(filename).split(".docx")[0];

  const inputPath = path.join(__dirname, `../files/${filename}`);
  const outputPath = path.join(__dirname, `../output/${outputFile}.pdf`);

  docxConverter(inputPath, outputPath, (err, obj) => {
    if(err){
      res.status(500).json({
        status: "failed",
        message: "Something went wrong."
      })
    }
    const file = fs.readFileSync(obj.filename);
    res.setHeader('Content-Type', 'application/pdf').status(200).end(file);
  });

});

