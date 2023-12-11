const express = require('express');
const routes = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleWare, authAdminMiddleWare } = require('../middlewares/AuthMiddleWares');

routes.post('/sign-up', userController.createUser)
routes.post('/sign-in', userController.loginUser)
routes.put('/update-user/:id', userController.updateUser)
routes.delete('/delete-user/:id', authMiddleWare, userController.deleteUser)
routes.get('/get-all-user', authMiddleWare, userController.getAllUser)
routes.post('/getUserInfo', authMiddleWare, userController.getUserInfo)
routes.post('/refresh-token', userController.getRefeshToken)


module.exports = routes