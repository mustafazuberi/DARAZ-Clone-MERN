const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    DOB: { type: Date, required: true },
    wishlist: { type: Array, default: [] },
    createdOn: { type: Date, default: Date.now },
});
const userModel = mongoose.model('Users', userSchema);





module.exports = userModel