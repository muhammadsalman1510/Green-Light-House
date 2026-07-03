import jwt from 'jsonwebtoken';

export function requireAdmin(req, res, next) {
  try {
    const token =
      req.cookies?.glh_admin_token ||
      req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: 'Token invalid or expired.' });
  }
}
