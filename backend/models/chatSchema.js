const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sellerId: { type: String, required: true },
    userId: { type: String, required: true },
    sellerName: { type: String, required: true },
    userName: { type: String, required: true },
    sellerImageUrl: { type: String, required: true },
    messages: { type: Array, required: true },
    createdOn: { type: Date, default: Date.now }
});
const chatModel = mongoose.model('chats', chatSchema);





module.exports = chatModel