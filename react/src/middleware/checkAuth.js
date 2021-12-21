const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/environment')

module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(400).send('access denied')

    try {
        const verified = jwt.verify(token, jwtSecret)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send({ error: 'auth failed' })
    }
}
