const User = require("../models/UserModel")
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefeshToken } = require("./JwtService")

const createUserService = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser != null) {
                resolve({
                    statusCode: -1003,
                    message: 'Email is existed',
                })
            }

            const saltRounds = 10
            const hash = bcrypt.hashSync(password, saltRounds);
            const createUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createUser) {
                resolve({
                    statusCode: 0,
                    message: 'create user success',
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUserService = (user) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = user
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    statusCode: -1003,
                    message: 'Email is not define',
                })
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password);

            if (comparePassword) {
                const access_token = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                const refesh_token = await generalRefeshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                resolve({
                    statusCode: 0,
                    message: 'login success',
                    data: {
                        access_token,
                        refesh_token
                    }
                })
            } else {
                resolve({
                    statusCode: -1004,
                    message: 'Password not correct',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (!checkUser) {
                resolve({
                    statusCode: -1,
                    message: 'The user is not exist'
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                statusCode: 0,
                message: 'success',
                data: updateUser
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if (!checkUser) {
                resolve({
                    statusCode: -1,
                    message: 'The user is not exist'
                })
            }

            await User.findByIdAndDelete(id)

            resolve({
                statusCode: 0,
                message: 'delete user success',
                data: {}
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                statusCode: 0,
                message: 'success',
                data: allUser
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getUserInfo = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userInfo = await User.findById(id)
            
            if (!userInfo) {
                resolve({
                    statusCode: -1,
                    message: 'User not exist',
                })
            }
            
            resolve({
                statusCode: 0,
                message: 'success',
                data: userInfo
            })
        } catch (e) {
            reject(e)
        }
    })
}

const refreshToken = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userInfo = await User.findById(id)
            
            // if (!userInfo) {
            //     resolve({
            //         statusCode: -1,
            //         message: 'User not exist',
            //     })
            // }
            
            resolve({
                statusCode: 0,
                message: 'success',
                // data: userInfo
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUserService,
    loginUserService,
    updateUser,
    deleteUser,
    getAllUser,
    getUserInfo,
    refreshToken
}

