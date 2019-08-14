function errorHandler(err, req, res, next) {
  res.status(err.code).json({
    code: err.code,
    msg: err.msg
  })
}

module.exports = errorHandler;