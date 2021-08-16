module.exports = ({ status, message }, req, res, next) => { 
  status = status || 500;
  res.status(status).json({
    status: "failed",
    message: message,
  });
  next();
};
