// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  let { status } = error;
  if (status === 200) status = 500;
  res.status(status || 500).json({
    success: false,
    error,
  });
};

export const notFoundPathErrorHandler = (req, res, next) => {
  const error = {
    message: 'Route not found',
    status: 404,
  };
  error.status = 404;
  next(error);
};
