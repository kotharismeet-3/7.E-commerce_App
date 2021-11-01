import dotenv from 'dotenv';
import express from 'express';
import connectDB from './mongo_db.js';
import products from './dummydata.js';

dotenv.config();
connectDB();

const app = express();
const port = 5000;

app.get('/api/product',(req,res) => {
    res.json(products);
});

app.get('/api/product/:id',(req,res) => {
    const product = products.find( (p) => p._id === req.params.id);
    res.json(product);
});

app.listen(port,console.log(`Server running on post${port}`));