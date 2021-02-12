import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
