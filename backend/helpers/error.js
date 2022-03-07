class ErrorHandler extends Error {
  constructor(statusCode, errCode, message) {
    super();
    this.statusCode = statusCode;
    this.errCode = errCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, errCode, message } = err;

  res.status(statusCode).json({
    status: "ERROR",
    errCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
