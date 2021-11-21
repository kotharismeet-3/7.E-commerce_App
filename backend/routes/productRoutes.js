const {getProducts, getProductById, deleteProduct, updateProduct, createProduct} = require('../controllers/productController.js')

//const router = express.Router();

module.exports = (app) => {
    app.get('/api/product', getProducts);
    app.get('/api/product/:id', getProductById);
    app.delete('/api/product/:id', deleteProduct);
    app.put('/api/product/:id', updateProduct)
    app.post('/api/product/create', createProduct);
}