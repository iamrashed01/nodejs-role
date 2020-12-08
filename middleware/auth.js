const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.headers['access_token'];
  if (!token) return res.status(401).json({ message: 'Access Denied', success: false });

  try {
    const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Access Denied', success: false });
  }
}