const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body
        if (!name ||
            !image ||
            !type ||
            !price ||
            !countInStock ||
            !rating ||
            !description) {
            return res.status(200).json({
                statusCode: -1,
                message: 'The input is required'
            })
        }

        const response = await ProductService.createProductService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log('error');
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body

        if (!productId) {
            return res.status(200).json({
                statusCode: -1,
                message: 'ProductId is required'
            })
        }

        const response = await ProductService.updateProductService(productId, data)
        
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const productId = req.params.id

        if (!productId) {
            return res.status(200).json({
                statusCode: -1,
                message: 'ProductId is required'
            })
        }

        const response = await ProductService.getProductService(productId)
        
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const {limit, page} = req.query
        console.log('getAllProduct');
        console.log(page);
        const response = await ProductService.getAllProductService(limit, page, req.query)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id

        if (!productId) {
            return res.status(200).json({
                statusCode: -1,
                message: 'ProductId is required'
            })
        }

        const response = await ProductService.deleteProductService(productId)
        
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getProduct,
    getAllProduct,
    deleteProduct
}