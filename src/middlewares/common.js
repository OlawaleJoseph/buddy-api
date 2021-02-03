// eslint-disable-next-line import/prefer-default-export
export const bodyTrimmer = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    Object.entries(req.body).forEach(([key, value]) => {
      req.body[key] = value.trim();
    });
  }
  next();
};
