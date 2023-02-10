const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id: { type: String },
    sellerId: { type: String, required: true },
    productName: { type: String },
    productCategory: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: String, required: true },
    productQuantity: { type: String, required: true },
    productShippingCost: { type: String, required: true },
    productImage: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    comments: { type: Array }
});
const productModel = mongoose.model('Products', productSchema);





module.exports = productModel