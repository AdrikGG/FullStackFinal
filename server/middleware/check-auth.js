const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // check if jwt is valid - (bad actors can otherwise try to reverse engineer jwts to access user data)
    let token = req.headers['authorization'].split(' ')[2];
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};
