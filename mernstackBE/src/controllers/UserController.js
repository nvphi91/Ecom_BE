const UserService = require('../services/UserService');
const { refreshToken } = require("../services/JwtService")

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        if (!name ||
            !email ||
            !password ||
            !confirmPassword ||
            !phone) {
            return res.status(200).json({
                statusCode: -1,
                message: 'The input is required'
            })
        }

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const isCheckEmail = reg.test(email)
        if (!isCheckEmail) {
            return res.status(200).json({
                statusCode: -1001,
                message: 'Email not correct'
            })
        }
        if (password !== confirmPassword) {
            return res.status(200).json({
                statusCode: -1002,
                message: 'ConfirmPassword not correct'
            })
        }
        const response = await UserService.createUserService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log('error');
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log('---------login-------');
        console.log(email);
        console.log(password);
        console.log('---------------------');
        if (!email ||
            !password) {
            return res.status(200).json({
                statusCode: -1,
                message: 'The input is required'
            })
        }

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const isCheckEmail = reg.test(email)
        if (!isCheckEmail) {
            return res.status(200).json({
                statusCode: -1001,
                message: 'Email not correct'
            })
        }
        const response = await UserService.loginUserService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body

        if (!userId) {
            return res.status(200).json({
                statusCode: -1,
                message: 'UserId is required'
            })
        }

        const response = await UserService.updateUser(userId, data)
        
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                statusCode: -1,
                message: 'UserId is required'
            })
        }

        const response = await UserService.deleteUser(userId)
        
        return res.status(200).json({
            response
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json({
            response
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getUserInfo = async (req, res) => {
    try {
        const {id, name} = req.body
        const response = await UserService.getUserInfo(id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getRefeshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1]
        console.log('token', token);
        if (!token) {
            return res.status(200).json({
                statusCode: -1,
                message: 'token is required'
            })
        }
        const response = await refreshToken(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUserInfo,
    getRefeshToken
}