const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    shopName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    productCategory: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    shopImageUrl: { type: String, required: true },
    followers: { type: Array },
    createdOn: { type: Date, default: Date.now },
});
const sellerModel = mongoose.model('Sellers', sellerSchema);





module.exports = sellerModel