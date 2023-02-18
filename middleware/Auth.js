require('dotenv').config()
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN } = process.env

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.status(400).json({ error: 'Unauthorized Access!' })
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN)

    if (decoded == null) {
      res.status(400).json({ error: 'Unauthorized Access!' })
    }
    next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
