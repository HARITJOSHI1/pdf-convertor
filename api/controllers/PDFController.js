const catchAsync = require("../utils/catchAsync");

exports.getData = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Hello World",
  });
});

exports.convert = catchAsync(async (req, res) => {
  const { filename } = req.query;
});
