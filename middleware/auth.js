const jwt = require('jsonwebtoken')
const UnauthorizedError = require('../errors/UnauthorizedError')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const extractedBearerToken = header => header.replace('Bearer ', '')

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing of malformed authorization header')
  }

  const token = extractedBearerToken(authorization)
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY)
    req.user = payload
    next()
  } catch (err) {
    throw new UnauthorizedError('Invalid or expired token')
  }
}
