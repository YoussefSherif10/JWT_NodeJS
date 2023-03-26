const jwt = require('jsonwebtoken')
const config = require('../../config')

const verifyToken = (req, res, next) => {
  // get the authorization error
  const token = req.header["authorization"];

  if (!token)
    return res.status(403).send("Unauthorized");

  try {
    // verify the incoming token
    const decoded = jwt.verify(token, config.AUTH_SECRET);
    req.claims = decoded;
  } catch (e) {
    return res.status(401).send('invalid token');
  }

  return next();
}

module.exports = verifyToken;