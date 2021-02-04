// eslint-disable-next-line import/prefer-default-export
export const bodyTrimmer = (req, _res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    Object.entries(req.body).forEach(([key, value]) => {
      req.body[key] = typeof value === 'string' ? value.trim() : value;
    });
  }
  next();
};
