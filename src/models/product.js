const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  code: { type: Number, minlength: 1, required: true, unique: true },
  price: { type: Number, minlength: 1, required: true },
  quantity: { type: Number, minlength: 1, required: true },
  category: { type: String, required: true },
  entryDate: { type: Date, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
