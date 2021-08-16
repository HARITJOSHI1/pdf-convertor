module.exports = function (f) {
  return (res, req, next) => {
    f(res, req).catch((err) => next(err));
  };
};
