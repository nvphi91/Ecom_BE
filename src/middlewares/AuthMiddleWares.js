const jwt = require('jsonwebtoken')

const authMiddleWare = (req, res, next) => {
    console.log('check tosken: ', req.headers.token);
    if (req.headers.token) {
        const token = req.headers.token.split(' ')[1]
        jwt.verify(token, 'access_token', (err, user) => {
            if (err) {
                return res.status(404).json({
                    statusCode: -1,
                    message: 'Token expired'
                })
            }
    
            const { payload } = user
            next()
        }) 
    }
}

const authAdminMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, 'access_token', (err, user) => {
        if (err) {
            return res.status(404).json({
                statusCode: -1,
                message: 'Token expired'
            })
        }

        const { payload } = user

        if (payload?.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                statusCode: -1,
                message: 'The authentication'
            })
        }
    })
}

module.exports = {
    authMiddleWare,
    authAdminMiddleWare
}