const ProductModel = require("../models/ProductModel")

const createProductService = (product) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, image, type, price, countInStock, rating, description } = product
            const checkProduct = await ProductModel.findOne({ name: name })
            if (checkProduct) {
                resolve({
                    statusCode: -10,
                    message: 'This product is existed',
                })
            }
            const createdProduct = await ProductModel.create(product)
            if (createdProduct) {
                resolve({
                    statusCode: 0,
                    message: 'create success',
                })
            } else {
                resolve({
                    statusCode: -1,
                    message: 'This product does not create',
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

const updateProductService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await ProductModel.findOne({
                _id: id
            })

            if (!checkProduct) {
                resolve({
                    statusCode: -1,
                    message: 'This product is not exist'
                })
            }

            const updateProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true })

            resolve({
                statusCode: 0,
                message: 'success',
                data: updateProduct
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getProductService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await ProductModel.findOne({
                _id: id
            })

            if (!checkProduct) {
                resolve({
                    statusCode: -1,
                    message: 'This product is not exist'
                })
            }

            const getProduct = await ProductModel.findById(id)

            resolve({
                statusCode: 0,
                message: 'success',
                data: getProduct
            })

        } catch (e) {
            reject(e)
        }
    })
}

const getAllProductService = (limit = 10, page = 0, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await ProductModel.count()
            const { sort, sortField, filter, filterField } = data

            if (filter) {
                const allProduct = await ProductModel.find()
                    .limit(limit)
                    .skip(page * limit)
                    .find({
                        [filterField]: { '$regex': filter }
                    })

                resolve({
                    statusCode: 0,
                    message: 'success',
                    data: {
                        data: allProduct,
                        total: totalProduct,
                        pageCurrent: page + 1,
                        totalPage: Math.ceil(totalProduct / limit)
                    }
                })
            }

            if (sort) {
                const objectSort = {}
                objectSort[sortField] = sort

                const allProduct = await ProductModel.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort)

                resolve({
                    statusCode: 0,
                    message: 'success',
                    data: {
                        data: allProduct,
                        total: totalProduct,
                        pageCurrent: page + 1,
                        totalPage: Math.ceil(totalProduct / limit)
                    }
                })
            }

            const allProduct = await ProductModel.find()
                .limit(limit)
                .skip(page * limit)

            resolve({
                statusCode: 0,
                message: 'success',
                data: {
                    data: allProduct,
                    total: totalProduct,
                    pageCurrent: page + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                }
            })

        } catch (e) {
            reject(e)
        }
    })
}

const deleteProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await ProductModel.findOne({
                _id: id
            })

            if (!checkProduct) {
                resolve({
                    statusCode: -1,
                    message: 'This product is not exist'
                })
            }

            await ProductModel.findByIdAndDelete(id)

            resolve({
                statusCode: 0,
                message: 'success',
                data: {}
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProductService,
    updateProductService,
    getProductService,
    getAllProductService,
    deleteProductService
}