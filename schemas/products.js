let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    quantity: { type: Number, default: 0, min: 0 },
    imgURL: { type: String, default: "" },
    category: { type: String, required: true },
    deleted: { type: Boolean, default: false } // Xóa mềm
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
