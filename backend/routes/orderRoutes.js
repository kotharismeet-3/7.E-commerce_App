const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder,
} = require("../controllers/orderController.js");

module.exports = (app) => {
    app.get('/api/orders', getOrders);
    app.post('/api/orders', addOrderItems);
    app.get('/api/orders/myorders', getMyOrders);
    app.get('/api/orders/:id', getOrderById)
    app.put('/api/orders/:id/pay', updateOrderToPaid);
    app.put('/api/orders/:id/deliver', updateOrderToDelivered);
    app.delete('/api/orders/:id', deleteOrder)
}