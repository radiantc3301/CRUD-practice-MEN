const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from node API Server!')
})

app.get('/api/products', async (req, res) => {
    try{
        res.status(200).send(await Product.find())
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/api/products/:id', async (req, res) => {
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
})
app.post('/api/products',async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.put('/api/products/:id', async (req, res) => {
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
})

app.delete('/api/products/:id', async (req, res) => {
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
})
mongoose.connect("mongodb+srv://anandsasi2004:rjBqKItWHKx1eMui@backenddb.umddqdp.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000')
        })
          
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err)
    })