const jwt = require('jsonwebtoken');

const generalAccessToken = (payload) => {
    const access_token = jwt.sign(
        {
            payload
        }, 'access_token', {
        expiresIn: '1h'
    })
    return access_token
}

const generalRefeshToken = (payload) => {
    const refesh_token = jwt.sign(
        {
            payload
        }, 'refesh_token', {
        expiresIn: '365d'
    })
    return refesh_token
}

const refreshToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, 'refesh_token', async (err, user) => {
                if (err) {
                    resolve(
                        {
                            statusCode: -1,
                            message: 'The authentication'
                        }
                    )
                }
                console.log('user', user);
                const { payload } = user

                const access_token = await generalAccessToken({
                    id:payload?.id,
                    isAdmin:payload?.isAdmin
                })
                resolve({
                    statusCode: 0,
                    message: 'The authentication',
                    data: access_token
                })
            })
        } catch (error) {
            reject(e)
        }
    })
}

module.exports = {
    generalAccessToken,
    generalRefeshToken,
    refreshToken
}