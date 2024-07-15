const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model.js')
const productRoute = require('./routes/product.route.js')
const app = express()
app.use(express.json())

app.use("/api/products", productRoute);


app.get('/', (req, res) => {
    res.send('Hello from node API Server!')
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