const Product = require("../models/productModel.js");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const userID = req.body.userID;
  //console.log(product.user.toString(),userID);
  if(product.user.toString() != userID){
    res.status(403);
    throw new Error("Can Only Update your Product");
    return;
  }
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/*
{      
      "name": "Airpods Wireless Bluetooth Headphones",
      "image": "/images/airpods.jpg",
      "userID":"117462052735733684124",
      "description":
        "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
      "brand": "Apple",
      "category": "Electronics",
      "price": 89.99,
      "countInStock": 10,
      "rating": 4.5,
      "numReviews": 12
    }
*/

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock, userID, numReviews } = req.body;
  const product = new Product({
    name: name,
    price: price,
    user: userID,
    image: image,
    brand: brand,
    category: category,
    countInStock: countInStock,
    numReviews: numReviews,
    description: description,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock, userID } = req.body;
  const product = await Product.findById(req.params.id);

  //console.log(category);
  /*if(product.user != userID){
    res.status(403);
    throw new Error("Can Only Update your Product");
    return;
  }*/
  //console.log(product);
  //console.log(req.body);

  if (product) {
    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.description = description ? description : product.description;
    product.image = image ? image : product.image;
    product.brand = brand ? brand : product.brand;
    product.category = category ? category : product.category;
    product.countInStock = countInStock ? countInStock : product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct
};
