const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userInfo: { type: Object, required: true },
    orderObj: { type: Object, required: true },
    ststus: { type: String, default: "pending" },
    userId: { type: String, required: true },
    sellerId: { type: String, required: true }
});
const orderModel = mongoose.model('orders', orderSchema);





module.exports = orderModel