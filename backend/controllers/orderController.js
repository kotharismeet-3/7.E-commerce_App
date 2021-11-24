const Order = require("../models/orderProduct.js");
const asyncHandler = require("express-async-handler");
const axios = require("axios");

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    userID,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentResult,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  }
  let qty_available = 0;

  //console.log(orderItems.product);
  await axios.get(`http://localhost:5000/api/product/${orderItems.product}`).then((response) => {
      //console.log(response.data.countInStock);
      qty_available = response.data.countInStock;
    });

  //console.log(qty_available, orderItems.qty);

  if (qty_available < orderItems.qty) {
    res.status(400);
    throw new Error("Quantity Exceeds Currently available Stocks.");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: userID,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    //console.log("I hope this works this time!");
    await axios.put(`http://localhost:5000/api/product/${orderItems.product}`, {
      "countInStock": qty_available - orderItems.qty,
    });
    
    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.body.userID });
  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    let qty_available = 0;

    //console.log(order.orderItems[0].product);
    await axios.get(`http://localhost:5000/api/product/${order.orderItems[0].product}`).then((response) => {
        //console.log(response.data.countInStock);
        qty_available = response.data.countInStock;
      });

    await axios.put(`http://localhost:5000/api/product/${order.orderItems[0].product}`,{
        "countInStock": qty_available + order.orderItems[0].qty,
    });
    //console.log()
    await order.remove();

    res.json({ message: "Order Cancelled" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder,
};

// const order = {
//   "userID" : "6199c275d232e4c7eae912f5",
//   "orderItems": {
//     "name" : "Airpods Wireless Bluetooth Headphones 2",
//     "qty" : 3,
//     "image" : "/images/airpods.jpg",
//     "price" : 89.99,
//     "product" : "619a25e83293cee2531a0e60"
//   },
//   "shippingAddress" : {
//     "address" : "Bhagyalaxmi Row House",
//     "city" : "Ahmedabad",
//     "country" : "India",
//     "postalcode" : "380061"
//   },
//   "paymentMethod" : "Cash on Delivery",
//   "itemsPrice" : 500,
//   "taxPrice" : 60,
//   "shippingPrice" : 0,
//   "totalPrice" :  560
// }
