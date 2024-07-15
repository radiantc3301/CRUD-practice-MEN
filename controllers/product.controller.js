const Product = require('../models/product.model.js')

const getProducts = async (req, res) => {
    try{
        res.status(200).send(await Product.find())
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json({message: 'Product not found'})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const createProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body)
        if(!product){
            res.status(404).json({message: 'Product not found'})
        }
        const updatedProduct = await Product.findById(req.params.id)
        res.status(200).json(updatedProduct)
    }catch(error){
        res.status(500).json({message: error.message})  
    }
}

const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            res.status(404).json({message: 'Product not found'})
        }
        res.status(200).json({message: "product deleted successfully"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}