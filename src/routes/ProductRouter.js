const express = require('express');
const routes = express.Router()
const productController = require('../controllers/ProductController')

const { authMiddleWare, authAdminMiddleWare } = require('../middlewares/AuthMiddleWares');

routes.post('/create', productController.createProduct)
routes.post('/update/:id', productController.updateProduct)
routes.get('/getProduct/:id', productController.getProduct)
routes.get('/getAllProduct', productController.getAllProduct)
routes.delete('/deleteProduct/:id', productController.deleteProduct)

module.exports = routes