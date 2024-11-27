// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or invalid format' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token, please log in again' });
    }

    res.status(401).json({ message: 'Unauthorized: Token verification failed' });
  }
};

module.exports = authMiddleware;
